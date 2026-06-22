const prisma = require('../config/db');
const path = require('path');

// تنظيف الـ IDs الفارغة حتى لا تسبب خطأ في العلاقات
const cleanObjectIdFields = (body) => {
    const objectIdFields = ['categoryId', 'supplierId'];
    for (const field of objectIdFields) {
        if (body[field] === '' || body[field] === null) {
            body[field] = null; // تعيينها كـ null بدلاً من حذفها لتحديثها في القاعدة
        }
    }
    return body;
};

// @desc    إضافة دواء جديد للمخزون
const createProduct = async (req, res) => {
    try {
        const data = cleanObjectIdFields({ ...req.body });

        const productExists = await prisma.product.findUnique({ 
            where: { barcode: data.barcode } 
        });
        
        if (productExists) {
            return res.status(400).json({ message: 'هذا الباركود مسجل مسبقاً لدواء آخر' });
        }

        const product = await prisma.product.create({ data });
        
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    عرض الأدوية مع الفلترة والبحث
const getProducts = async (req, res) => {
    try {
        let whereClause = {};

        // 1. الفلترة بالاسم أو الباركود (بحث جزئي باستخدام Prisma contains)
        if (req.query.keyword) {
            whereClause.OR = [
                { name: { contains: req.query.keyword, mode: 'insensitive' } },
                { barcode: { contains: req.query.keyword, mode: 'insensitive' } }
            ];
        }

        // 2. فلترة النواقص (الكمية أقل من 10)
        if (req.query.lowStock === 'true') {
            whereClause.stockQuantity = { lt: 10 };
        }

        const products = await prisma.product.findMany({
            where: whereClause,
            take: 200, // تحديد 200 منتج فقط كحد أقصى لتجنب بطء المتصفح بـ 26 ألف منتج
            orderBy: { createdAt: 'desc' },
            include: { category: true, supplier: true } // دمج بيانات الفئة والمورد (تعادل populate)
        });
        
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    جلب تفاصيل دواء واحد بالـ ID
const getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id },
            include: { category: true, supplier: true }
        });
        
        if (!product) {
            return res.status(404).json({ message: 'الدواء غير موجود' });
        }
        
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    تعديل بيانات دواء
const updateProduct = async (req, res) => {
    try {
        const data = cleanObjectIdFields({ ...req.body });

        const exists = await prisma.product.findUnique({ where: { id: req.params.id } });
        if (!exists) {
            return res.status(404).json({ message: 'الدواء غير موجود' });
        }

        const product = await prisma.product.update({
            where: { id: req.params.id },
            data: data
        });

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        // P2002 هو كود الخطأ الخاص بتكرار الحقول الفريدة (Unique Constraint) في Prisma
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'هذا الباركود مسجل مسبقاً لدواء آخر' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    حذف دواء من المخزون
const deleteProduct = async (req, res) => {
    try {
        const exists = await prisma.product.findUnique({ where: { id: req.params.id } });

        if (!exists) {
            return res.status(404).json({ message: 'الدواء غير موجود' });
        }

        await prisma.product.delete({
            where: { id: req.params.id }
        });

        res.status(200).json({
            success: true,
            message: 'تم حذف الدواء بنجاح'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload product image from device
const uploadProductImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const filePath = `/uploads/products/${req.file.filename}`.replace(/\\/g, '/');
        const imageUrl = `${req.protocol}://${req.get('host')}${filePath}`;

        res.status(201).json({
            success: true,
            data: {
                image: imageUrl,
                filename: req.file.filename,
                mimeType: req.file.mimetype,
                size: req.file.size,
                extension: path.extname(req.file.originalname)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Shortages Insights (Products with stock <= minStockAlert + their monthly sales rate)
const getShortagesInsights = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // 1. Fetch monthly sales (OrderItems) first to find what actually sold
        const recentOrderItems = await prisma.orderItem.groupBy({
            by: ['productId'],
            where: {
                order: {
                    createdAt: { gte: thirtyDaysAgo },
                    status: 'completed'
                }
            },
            _sum: {
                quantity: true
            }
        });

        if (!recentOrderItems.length) {
            return res.status(200).json({ success: true, count: 0, data: [] });
        }

        const salesMap = {};
        const soldProductIds = [];
        recentOrderItems.forEach(item => {
            salesMap[item.productId] = item._sum.quantity || 0;
            soldProductIds.push(item.productId);
        });

        // 2. Fetch products ONLY for those that actually sold AND have low stock (<= 10)
        const products = await prisma.product.findMany({
            where: {
                id: { in: soldProductIds },
                stockQuantity: { lte: 10 }
            },
            select: {
                id: true,
                name: true,
                barcode: true,
                stockQuantity: true,
                minStockAlert: true,
                image: true,
                purchasingPrice: true,
                sellingPrice: true
            },
            orderBy: { stockQuantity: 'asc' }
        });

        // 3. Map sales back to products
        const data = products.map(p => ({
            ...p,
            monthlySalesRate: salesMap[p.id] || 0
        }));

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct, uploadProductImage, getShortagesInsights };