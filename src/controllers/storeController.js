const prisma = require('../config/db');

const getStoreProducts = async (req, res) => {
    try {
        const { keyword, category, page = 1, limit = 20 } = req.query;
        let whereClause = { 
            isAvailableOnline: true, 
            stockQuantity: { gt: 0 } 
        };

        if (keyword) {
            whereClause.OR = [
                { name: { contains: keyword, mode: 'insensitive' } },
                { scientificName: { contains: keyword, mode: 'insensitive' } }
            ];
        }
        if (category) whereClause.categoryId = category;

        const products = await prisma.product.findMany({
            where: whereClause,
            select: { // تحديد الحقول لإخفاء معلومات الشراء والمورد
                id: true,
                name: true,
                scientificName: true,
                barcode: true,
                description: true,
                image: true,
                sellingPrice: true,
                stockQuantity: true,
                expiryDate: true,
                requiresPrescription: true,
                unit: true,
                category: { select: { name: true } }
            },
            orderBy: { createdAt: 'desc' },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit)
        });

        const total = await prisma.product.count({ where: whereClause });

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            totalPages: Math.ceil(total / limit),
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStoreProduct = async (req, res) => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                id: req.params.id,
                isAvailableOnline: true
            },
            select: {
                id: true,
                name: true,
                scientificName: true,
                barcode: true,
                description: true,
                image: true,
                sellingPrice: true,
                stockQuantity: true,
                expiryDate: true,
                requiresPrescription: true,
                unit: true,
                category: { select: { name: true } }
            }
        });

        if (!product) {
            return res.status(404).json({ message: 'المنتج غير موجود' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStoreCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' }
        });
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOnlineOrder = async (req, res) => {
    try {
        const { orderItems, deliveryAddress, customerPhone, notes } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'السلة فارغة' });
        }
        if (!deliveryAddress || !deliveryAddress.trim()) {
            return res.status(400).json({ message: 'يرجى إدخال عنوان التوصيل' });
        }
        if (!customerPhone || !customerPhone.trim()) {
            return res.status(400).json({ message: 'يرجى إدخال رقم الهاتف' });
        }

        let subtotal = 0;
        const itemsToSave = [];

        for (const item of orderItems) {
            const product = await prisma.product.findFirst({
                where: {
                    id: item.productId,
                    isAvailableOnline: true
                }
            });

            if (!product) {
                return res.status(404).json({ message: 'أحد المنتجات غير متاح حالياً' });
            }
            if (product.stockQuantity < item.quantity) {
                return res.status(400).json({
                    message: `الكمية المتاحة من ${product.name} هي ${product.stockQuantity} فقط`
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

        const order = await prisma.order.create({
            data: {
                orderNumber: 'ONL-' + Date.now(),
                customerId: req.user.id,
                subtotal,
                totalAmount: subtotal,
                orderType: 'ONLINE',
                status: 'pending',
                paymentMethod: 'cash',
                deliveryAddress: deliveryAddress.trim(),
                customerPhone: customerPhone.trim(),
                notes: notes?.trim(),
                items: {
                    create: itemsToSave
                }
            }
        });

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

const getMyOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { customerId: req.user.id },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStoreProducts,
    getStoreProduct,
    getStoreCategories,
    createOnlineOrder,
    getMyOrders
};