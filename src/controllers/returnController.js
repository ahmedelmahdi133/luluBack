const prisma = require('../config/db');

const createSalesReturn = async (req, res) => {
    try {
        const { orderId, items, refundMethod, notes } = req.body;

        if (!orderId) return res.status(400).json({ message: 'Order ID is required' });
        if (!items || items.length === 0) return res.status(400).json({ message: 'Select items to return' });

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: { include: { product: { select: { name: true } } } } }
        });

        if (!order) return res.status(404).json({ message: 'Order not found' });

        let totalRefund = 0;
        const returnItems = [];

        for (const item of items) {
            const orderItem = order.items.find(oi => oi.productId === item.productId);
            if (!orderItem) return res.status(400).json({ message: 'Item not found in original order' });
            
            const qty = parseInt(item.quantity, 10);
            
            if (qty > orderItem.quantity) return res.status(400).json({ message: `Return qty exceeds sold qty for ${orderItem.productName || 'item'}` });

            const refundAmount = orderItem.priceAtPurchase * qty;
            totalRefund += refundAmount;

            returnItems.push({
                productId: item.productId,
                productName: orderItem.productName || orderItem.product?.name || '',
                quantity: qty,
                priceAtReturn: orderItem.priceAtPurchase,
                reason: item.reason || 'customer_request'
            });
        }

        // إنشاء المرتجع وتفاصيله (Nested Write)
        const returnDoc = await prisma.return.create({
            data: {
                returnNumber: 'SRET-' + Date.now(),
                returnType: 'sales',
                orderId,
                pharmacistId: req.user.id,
                totalRefund,
                refundMethod: refundMethod || 'cash',
                notes: notes?.trim(),
                status: 'completed',
                items: {
                    create: returnItems
                }
            }
        });

        // استرجاع الكميات للمخزون
        for (const item of returnItems) {
            await prisma.product.update({
                where: { id: item.productId },
                data: { stockQuantity: { increment: item.quantity } }
            });
        }

        res.status(201).json({ success: true, data: returnDoc });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPurchaseReturn = async (req, res) => {
    try {
        const { purchaseId, items, notes } = req.body;

        if (!purchaseId) return res.status(400).json({ message: 'Purchase ID is required' });
        if (!items || items.length === 0) return res.status(400).json({ message: 'Select items to return' });

        const purchase = await prisma.purchase.findUnique({
            where: { id: purchaseId },
            include: { items: { include: { product: { select: { name: true, stockQuantity: true } } } } }
        });

        if (!purchase) return res.status(404).json({ message: 'Purchase invoice not found' });

        let totalRefund = 0;
        const returnItems = [];

        for (const item of items) {
            const purchaseItem = purchase.items.find(pi => pi.productId === item.productId);
            if (!purchaseItem) return res.status(400).json({ message: 'Item not found in purchase invoice' });
            
            const qty = parseInt(item.quantity, 10);
            
            if (qty > purchaseItem.quantity) return res.status(400).json({ message: `Return qty exceeds purchased qty` });

            const product = await prisma.product.findUnique({ where: { id: item.productId } });
            if (product && product.stockQuantity < qty) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}. Available: ${product.stockQuantity}` });
            }

            const refundAmount = purchaseItem.purchasePrice * qty;
            totalRefund += refundAmount;

            returnItems.push({
                productId: item.productId,
                productName: purchaseItem.product?.name || product?.name || '',
                quantity: qty,
                priceAtReturn: purchaseItem.purchasePrice,
                reason: item.reason || 'defective'
            });
        }

        const returnDoc = await prisma.return.create({
            data: {
                returnNumber: 'PRET-' + Date.now(),
                returnType: 'purchase',
                purchaseId,
                pharmacistId: req.user.id,
                totalRefund,
                refundMethod: 'credit',
                notes: notes?.trim(),
                status: 'completed',
                items: {
                    create: returnItems
                }
            }
        });

        // خصم الكميات من المخزون
        for (const item of returnItems) {
            await prisma.product.update({
                where: { id: item.productId },
                data: { stockQuantity: { decrement: item.quantity } }
            });
        }

        res.status(201).json({ success: true, data: returnDoc });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReturns = async (req, res) => {
    try {
        const { page = 1, limit = 50, type } = req.query;
        let whereClause = {};
        if (type) whereClause.returnType = type;

        const returns = await prisma.return.findMany({
            where: whereClause,
            include: {
                pharmacist: { select: { name: true } },
                order: { select: { orderNumber: true } },
                purchase: { select: { invoiceNumber: true } }
            },
            orderBy: { createdAt: 'desc' },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit)
        });

        const total = await prisma.return.count({ where: whereClause });

        res.status(200).json({ success: true, count: returns.length, total, data: returns });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchOrder = async (req, res) => {
    try {
        const { q } = req.query;

        // If no query, return the latest 15 completed orders
        if (!q || q.trim() === '') {
            const orders = await prisma.order.findMany({
                where: { status: { in: ['completed', 'delivered'] } },
                include: { items: { include: { product: { select: { name: true, barcode: true } } } } },
                orderBy: { createdAt: 'desc' },
                take: 15
            });
            return res.status(200).json({ success: true, type: 'multiple', data: orders });
        }

        const query = q.trim();

        // 1. Try finding by exact Order Number
        const order = await prisma.order.findUnique({
            where: { orderNumber: query },
            include: { items: { include: { product: { select: { name: true, barcode: true } } } } }
        });

        if (order) {
            return res.status(200).json({ success: true, type: 'single', data: order });
        }

        // 2. Try finding by Product Barcode or Name
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { barcode: query },
                    { name: { contains: query, mode: 'insensitive' } }
                ]
            }
        });

        if (products.length > 0) {
            const productIds = products.map(p => p.id);
            // Find recent orders containing these products
            const orders = await prisma.order.findMany({
                where: {
                    items: { some: { productId: { in: productIds } } },
                    status: { in: ['completed', 'delivered'] }
                },
                include: { items: { include: { product: { select: { name: true, barcode: true } } } } },
                orderBy: { createdAt: 'desc' },
                take: 15
            });

            if (orders.length > 0) {
                return res.status(200).json({ success: true, type: 'multiple', data: orders });
            } else {
                return res.status(404).json({ message: 'لا توجد فواتير سابقة لهذا الدواء' });
            }
        }

        return res.status(404).json({ message: 'لم يتم العثور على الفاتورة أو الدواء' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchPurchase = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: 'Search query required' });

        const purchase = await prisma.purchase.findUnique({
            where: { invoiceNumber: q.trim() },
            include: { items: { include: { product: { select: { name: true } } } } }
        });

        if (!purchase) return res.status(404).json({ message: 'Purchase invoice not found' });

        res.status(200).json({ success: true, data: purchase });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createSalesReturn, createPurchaseReturn, getReturns, searchOrder, searchPurchase };