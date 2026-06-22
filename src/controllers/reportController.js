const prisma = require('../config/db');

const getDailyReport = async (req, res) => {
    try {
        const { date } = req.query;
        const targetDate = date ? new Date(date) : new Date();
        const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

        const dateFilter = { createdAt: { gte: startOfDay, lte: endOfDay } };

        const orders = await prisma.order.findMany({
            where: {
                ...dateFilter,
                status: { in: ['completed', 'delivered'] }
            }
        });

        let totalSales = 0;
        let cashSales = 0;
        let cardSales = 0;
        let posOrders = 0;
        let onlineOrders = 0;

        orders.forEach(order => {
            totalSales += order.totalAmount;
            if (order.paymentMethod === 'cash') cashSales += order.totalAmount;
            else if (order.paymentMethod === 'card' || order.paymentMethod === 'visa') cardSales += order.totalAmount;
            else if (order.paymentMethod === 'split') {
                cashSales += (order.splitCash || 0);
                cardSales += (order.splitCard || 0);
            }
            if (order.orderType === 'POS') posOrders++;
            else onlineOrders++;
        });

        const returns = await prisma.return.findMany({ where: dateFilter });
        let totalReturns = 0;
        returns.forEach(r => { totalReturns += r.totalRefund; });

        const expenseResult = await prisma.expense.aggregate({
            _sum: { amount: true },
            where: { date: { gte: startOfDay, lte: endOfDay } }
        });
        const totalExpenses = expenseResult._sum.amount || 0;

        res.status(200).json({
            success: true,
            data: {
                date: startOfDay,
                totalSales,
                cashSales,
                cardSales,
                totalOrders: orders.length,
                posOrders,
                onlineOrders,
                totalReturns,
                totalExpenses,
                netRevenue: totalSales - totalReturns - totalExpenses
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMonthlyReport = async (req, res) => {
    try {
        const { year, month } = req.query;
        const y = parseInt(year) || new Date().getFullYear();
        const m = parseInt(month) || new Date().getMonth() + 1;

        const startOfMonth = new Date(y, m - 1, 1);
        const endOfMonth = new Date(y, m, 0, 23, 59, 59, 999);

        const orders = await prisma.order.findMany({
            where: {
                createdAt: { gte: startOfMonth, lte: endOfMonth },
                status: { in: ['completed', 'delivered'] }
            },
            select: { createdAt: true, totalAmount: true }
        });

        // تجميع المبيعات اليومية في الذاكرة (سريع جداً ولن يشكل عبء)
        const dailyMap = {};
        let totalSales = 0;
        let totalOrders = orders.length;

        orders.forEach(order => {
            const day = order.createdAt.getDate();
            if (!dailyMap[day]) dailyMap[day] = { _id: day, totalSales: 0, orderCount: 0 };
            dailyMap[day].totalSales += order.totalAmount;
            dailyMap[day].orderCount += 1;
            totalSales += order.totalAmount;
        });

        const dailyBreakdown = Object.values(dailyMap).sort((a, b) => a._id - b._id);

        const expenses = await prisma.expense.findMany({
            where: { date: { gte: startOfMonth, lte: endOfMonth } },
            select: { category: true, amount: true }
        });

        const expenseMap = {};
        let totalExpenses = 0;
        expenses.forEach(e => {
            if (!expenseMap[e.category]) expenseMap[e.category] = { _id: e.category, total: 0 };
            expenseMap[e.category].total += e.amount;
            totalExpenses += e.amount;
        });

        const expenseBreakdown = Object.values(expenseMap);

        res.status(200).json({
            success: true,
            data: {
                year: y,
                month: m,
                totalSales,
                totalOrders,
                totalExpenses,
                netRevenue: totalSales - totalExpenses,
                dailyBreakdown,
                expenseBreakdown
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTopProducts = async (req, res) => {
    try {
        const { days = 30, limit = 10 } = req.query;
        const since = new Date();
        since.setDate(since.getDate() - parseInt(days));

        const orders = await prisma.order.findMany({
            where: {
                createdAt: { gte: since },
                status: { in: ['completed', 'delivered'] }
            },
            include: { items: true }
        });

        const productMap = {};

        orders.forEach(order => {
            order.items.forEach(item => {
                if (!productMap[item.productId]) {
                    productMap[item.productId] = {
                        _id: item.productId,
                        productName: item.productName,
                        totalQuantity: 0,
                        totalRevenue: 0
                    };
                }
                productMap[item.productId].totalQuantity += item.quantity;
                productMap[item.productId].totalRevenue += (item.priceAtPurchase * item.quantity);
            });
        });

        const topProducts = Object.values(productMap)
            .sort((a, b) => b.totalQuantity - a.totalQuantity)
            .slice(0, parseInt(limit));

        res.status(200).json({ success: true, data: topProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getExpiryAlerts = async (req, res) => {
    try {
        const { days = 90 } = req.query;
        const alertDate = new Date();
        alertDate.setDate(alertDate.getDate() + parseInt(days));

        const products = await prisma.product.findMany({
            where: {
                expiryDate: { lte: alertDate },
                stockQuantity: { gt: 0 }
            },
            include: { category: { select: { name: true } } },
            orderBy: { expiryDate: 'asc' }
        });

        const expired = products.filter(p => p.expiryDate <= new Date());
        const expiringSoon = products.filter(p => p.expiryDate > new Date());

        res.status(200).json({
            success: true,
            data: { expired, expiringSoon, totalAlerts: products.length }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLowStockAlerts = async (req, res) => {
    try {
        // استعلام للحصول على العدد الإجمالي أولاً لعدم إرسال داتا ضخمة
        const countResult = await prisma.$queryRaw`
            SELECT COUNT(*) as count FROM "Product" 
            WHERE "stockQuantity" <= "minStockAlert"
        `;
        const totalCount = Number(countResult[0]?.count || 0);

        // جلب أول 15 منتج فقط للوحة التحكم
        const lowStockProductsIds = await prisma.$queryRaw`
            SELECT id FROM "Product" 
            WHERE "stockQuantity" <= "minStockAlert"
            ORDER BY "stockQuantity" ASC
            LIMIT 15
        `;
        
        const ids = lowStockProductsIds.map(p => p.id);

        let products = [];
        if (ids.length > 0) {
            products = await prisma.product.findMany({
                where: { id: { in: ids } },
                include: { category: { select: { name: true } } },
                orderBy: { stockQuantity: 'asc' }
            });
        }

        res.status(200).json({
            success: true,
            count: totalCount,
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getShortagesAnalysis = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // 1. Fetch products sold today
        const todayOrders = await prisma.order.findMany({
            where: {
                createdAt: { gte: startOfDay },
                status: { in: ['completed', 'delivered'] }
            },
            include: { items: true }
        });

        const todayProductIds = new Set();
        todayOrders.forEach(o => o.items.forEach(i => todayProductIds.add(i.productId)));

        // 2. Fetch low stock products
        const lowStockProductsIds = await prisma.$queryRaw`
            SELECT id FROM "Product" 
            WHERE "stockQuantity" <= "minStockAlert"
        `;
        const lowStockIds = lowStockProductsIds.map(p => p.id);

        // Combine IDs
        const relevantProductIds = Array.from(new Set([...todayProductIds, ...lowStockIds]));

        if (relevantProductIds.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }

        // 3. Fetch all relevant products
        const products = await prisma.product.findMany({
            where: { id: { in: relevantProductIds } },
            include: { category: { select: { name: true } } }
        });

        // 4. Fetch their monthly sales
        const monthlyOrders = await prisma.order.findMany({
            where: {
                createdAt: { gte: thirtyDaysAgo },
                status: { in: ['completed', 'delivered'] },
                items: { some: { productId: { in: relevantProductIds } } }
            },
            include: { items: { where: { productId: { in: relevantProductIds } } } }
        });

        const monthlySalesMap = {};
        const todaySalesMap = {};

        monthlyOrders.forEach(o => {
            const isToday = o.createdAt >= startOfDay;
            o.items.forEach(i => {
                monthlySalesMap[i.productId] = (monthlySalesMap[i.productId] || 0) + i.quantity;
                if (isToday) {
                    todaySalesMap[i.productId] = (todaySalesMap[i.productId] || 0) + i.quantity;
                }
            });
        });

        // 5. Build result
        const result = products.map(p => ({
            id: p.id,
            name: p.name,
            barcode: p.barcode,
            category: p.category?.name || 'Uncategorized',
            stockQuantity: p.stockQuantity,
            minStockAlert: p.minStockAlert,
            soldToday: todaySalesMap[p.id] || 0,
            soldThisMonth: monthlySalesMap[p.id] || 0,
            isLowStock: p.stockQuantity <= p.minStockAlert
        }));

        // sort by soldToday descending, then by low stock
        result.sort((a, b) => b.soldToday - a.soldToday || a.stockQuantity - b.stockQuantity);

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDailyReport,
    getMonthlyReport,
    getTopProducts,
    getExpiryAlerts,
    getLowStockAlerts,
    getShortagesAnalysis
};