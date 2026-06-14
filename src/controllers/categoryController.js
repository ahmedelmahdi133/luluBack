const prisma = require('../config/db');

const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'يرجى إدخال اسم التصنيف' });
        }

        const trimmedName = name.trim();
        const exists = await prisma.category.findUnique({ where: { name: trimmedName } });
        if (exists) {
            return res.status(400).json({ message: 'هذا التصنيف موجود بالفعل' });
        }

        const category = await prisma.category.create({
            data: {
                name: trimmedName,
                description: description?.trim(),
                image
            }
        });

        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const filter = {};
        if (req.query.active === 'true') filter.isActive = true;

        const categories = await prisma.category.findMany({
            where: filter,
            orderBy: { name: 'asc' } // ترتيب أبجدي
        });
        res.status(200).json({ success: true, count: categories.length, data: categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        // التحقق أولاً من وجود التصنيف
        const exists = await prisma.category.findUnique({ where: { id: req.params.id } });
        if (!exists) {
            return res.status(404).json({ message: 'التصنيف غير موجود' });
        }

        const category = await prisma.category.update({
            where: { id: req.params.id },
            data: req.body
        });
        
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        // التعامل مع خطأ تكرار الاسم في Prisma (كود الخطأ P2002)
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'اسم التصنيف موجود بالفعل' });
        }
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const exists = await prisma.category.findUnique({ where: { id: req.params.id } });
        if (!exists) {
            return res.status(404).json({ message: 'التصنيف غير موجود' });
        }

        await prisma.category.delete({
            where: { id: req.params.id }
        });
        
        res.status(200).json({ success: true, message: 'تم حذف التصنيف بنجاح' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };