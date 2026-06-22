const prisma = require('../config/db');

const createOrder = async (req, res) => {
    try {
        const { orderItems, paymentMethod, orderType, discount, paidAmount, splitPayment, customerPhone, notes } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'لا توجد أدوية في الفاتورة' });
        }

        const currentShift = await prisma.shift.findFirst({
            where: {
                pharmacistId: req.user.id,
                status: 'open'
            }
        });

        let subtotal = 0;
        const itemsToSave = [];

        // التأكد من توافر المخزون وحساب الإجمالي
        for (const item of orderItems) {
            const product = await prisma.product.findUnique({ where: { id: item.productId } });

            if (!product) {
                return res.status(404).json({ message: 'أحد الأدوية غير موجود في قاعدة البيانات' });
            }
            if (product.stockQuantity < item.quantity) {
                return res.status(400).json({
                    message: `الكمية المتاحة من ${product.name} لا تكفي. المتاح: ${product.stockQuantity}`
                });
            }

            subtotal += product.sellingPrice * item.quantity;
            itemsToSave.push({
                productId: product.id,
                productName: product.name,
                quantity: item.quantity,
                priceAtPurchase: product.sellingPrice
            });
        }

        let totalAmount = subtotal;
        let discountType = 'fixed';
        let discountValue = 0;

        // حساب الخصم بعد فصله عن الـ Object
        if (discount) {
            discountType = discount.type || 'fixed';
            discountValue = discount.value || 0;

            if (discountType === 'percentage') {
                const discountVal = Math.min(Math.max(discountValue, 0), 100);
                totalAmount = subtotal - (subtotal * discountVal / 100);
            } else if (discountType === 'fixed') {
                const discountVal = Math.min(Math.max(discountValue, 0), subtotal);
                totalAmount = subtotal - discountVal;
            }
        }
        totalAmount = Math.round(totalAmount * 100) / 100;

        let paid = Number(paidAmount) || 0;
        let change = 0;
        let dueAmount = 0;
        let splitCash = 0;
        let splitCard = 0;

        const method = paymentMethod || 'cash';
        
        if (method === 'pending') {
            paid = 0;
            dueAmount = totalAmount;
        } else if (method === 'split') {
            splitCash = Number(splitPayment?.cash) || 0;
            splitCard = Number(splitPayment?.card) || 0;
            const splitTotal = Math.round((splitCash + splitCard) * 100) / 100;
            
            if (Math.abs(splitTotal - totalAmount) > 0.01) {
                return res.status(400).json({ message: 'Split payment must equal total amount' });
            }
            paid = splitTotal;
            change = 0;
        } else if (method === 'visa' || method === 'card') {
            paid = totalAmount;
            change = 0;
        } else {
            paid = paid > 0 ? paid : totalAmount;
            change = Math.max(0, paid - totalAmount);
        }

        // إنشاء الفاتورة وعناصرها (Nested Write)
        const order = await prisma.order.create({
            data: {
                orderNumber: 'ORD-' + Date.now(),
                pharmacistId: req.user.id,
                shiftId: currentShift?.id,
                subtotal,
                discountType,
                discountValue,
                totalAmount,
                paidAmount: paid,
                changeAmount: change,
                dueAmount,
                orderType: orderType || 'POS',
                paymentMethod: method,
                splitCash,
                splitCard,
                customerPhone: customerPhone?.trim(),
                notes: notes?.trim(),
                status: 'completed',
                items: {
                    create: itemsToSave
                }
            },
            include: { pharmacist: { select: { name: true } } }
        });

        // خصم الكميات من المخزون باستخدام خاصية decrement في Prisma
        for (const item of itemsToSave) {
            await prisma.product.update({
                where: { id: item.productId },
                data: { stockQuantity: { decrement: item.quantity } }
            });
        }

        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const { page = 1, limit = 50, orderType, status, startDate, endDate } = req.query;
        let whereClause = {};

        if (orderType) whereClause.orderType = orderType;
        if (status) whereClause.status = status;
        if (startDate || endDate) {
            whereClause.createdAt = {};
            if (startDate) whereClause.createdAt.gte = new Date(startDate);
            if (endDate) whereClause.createdAt.lte = new Date(new Date(endDate).setHours(23, 59, 59));
        }

        const orders = await prisma.order.findMany({
            where: whereClause,
            include: {
                pharmacist: { select: { name: true } },
                customer: { select: { name: true, phone: true } }
            },
            orderBy: { createdAt: 'desc' },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit)
        });

        const total = await prisma.order.count({ where: whereClause });

        res.status(200).json({
            success: true,
            count: orders.length,
            total,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.id },
            include: {
                pharmacist: { select: { name: true } },
                customer: { select: { name: true, phone: true, address: true } },
                items: { include: { product: { select: { name: true, barcode: true } } } }
            }
        });

        if (!order) {
            return res.status(404).json({ message: 'الفاتورة غير موجودة' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'processing', 'completed', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'حالة غير صالحة' });
        }

        const order = await prisma.order.findUnique({
            where: { id: req.params.id },
            include: { items: true }
        });

        if (!order) {
            return res.status(404).json({ message: 'الطلب غير موجود' });
        }

        // إرجاع المخزون في حال الإلغاء
        if (status === 'cancelled' && order.status !== 'cancelled') {
            for (const item of order.items) {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: { stockQuantity: { increment: item.quantity } } // increment للزيادة
                });
            }
        }

        const updatedOrder = await prisma.order.update({
            where: { id: req.params.id },
            data: { status }
        });

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOnlineOrders = async (req, res) => {
    try {
        // التحقق إن الصيدلاني عنده وردية مفتوحة
        const activeShift = await prisma.shift.findFirst({
            where: { pharmacistId: req.user.id, status: 'open' }
        });

        const { status } = req.query;
        const statusFilter = status
            ? [status]
            : ['pending', 'processing'];

        const orders = await prisma.order.findMany({
            where: {
                orderType: 'ONLINE',
                status: { in: statusFilter }
            },
            include: {
                customer: { select: { name: true, phone: true, address: true } },
                pharmacist: { select: { name: true } },
                items: {
                    include: {
                        product: { select: { name: true, barcode: true, sellingPrice: true } }
                    }
                }
            },
            orderBy: { createdAt: 'asc' } // الأقدم أولاً (FIFO)
        });

        res.status(200).json({
            success: true,
            hasActiveShift: !!activeShift,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodaySales = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const orders = await prisma.order.findMany({
            where: {
                createdAt: { gte: startOfDay },
                status: { in: ['completed', 'delivered'] }
            }
        });

        let totalSales = 0;
        let totalOrders = orders.length;
        orders.forEach(o => { totalSales += o.totalAmount; });

        res.status(200).json({
            success: true,
            data: { totalSales, totalOrders }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const settlePendingInvoice = async (req, res) => {
    try {
        const { paymentMethod, paidAmount, splitPayment } = req.body;
        const validMethods = ['cash', 'visa', 'split'];
        if (!validMethods.includes(paymentMethod)) {
            return res.status(400).json({ message: 'Invalid payment method for settlement' });
        }

        const order = await prisma.order.findUnique({ where: { id: req.params.id } });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (!(order.paymentMethod === 'pending' || (order.dueAmount || 0) > 0)) {
            return res.status(400).json({ message: 'This invoice is not pending' });
        }

        const due = Number(order.dueAmount || order.totalAmount);
        let paid = Number(paidAmount) || 0;
        let change = 0;
        let splitCash = order.splitCash || 0;
        let splitCard = order.splitCard || 0;

        if (paymentMethod === 'split') {
            const cashPart = Number(splitPayment?.cash) || 0;
            const visaPart = Number(splitPayment?.card) || 0;
            const splitTotal = Math.round((cashPart + visaPart) * 100) / 100;
            if (Math.abs(splitTotal - due) > 0.01) {
                return res.status(400).json({ message: 'Split amount must equal remaining due' });
            }
            paid = splitTotal;
            splitCash = cashPart;
            splitCard = visaPart;
        } else if (paymentMethod === 'visa') {
            paid = due;
            splitCash = 0;
            splitCard = due;
        } else {
            paid = paid > 0 ? paid : due;
            if (paid < due) {
                return res.status(400).json({ message: 'Paid amount must cover remaining due' });
            }
            change = Math.max(0, paid - due);
            splitCash = paid - change;
            splitCard = 0;
        }

        const updateData = {
            paidAmount: Math.round((Number(order.paidAmount || 0) + paid) * 100) / 100,
            changeAmount: change,
            dueAmount: 0,
            paymentMethod,
            splitCash,
            splitCard
        };

        if (order.status === 'pending') {
            updateData.status = 'completed';
        }

        const updatedOrder = await prisma.order.update({
            where: { id: order.id },
            data: updateData,
            include: {
                pharmacist: { select: { name: true } },
                customer: { select: { name: true, phone: true } }
            }
        });

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, getTodaySales, settlePendingInvoice, getOnlineOrders };