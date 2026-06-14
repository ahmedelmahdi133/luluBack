const prisma = require('../config/db');

const createExpense = async (req, res) => {
    try {
        const { description, amount, category, date } = req.body;

        if (!description || !description.trim()) {
            return res.status(400).json({ message: 'يرجى إدخال وصف المصروف' });
        }
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'يرجى إدخال مبلغ صحيح' });
        }

        const expense = await prisma.expense.create({
            data: {
                description: description.trim(),
                amount: Number(amount),
                category: category || 'other',
                date: date ? new Date(date) : new Date(),
                pharmacistId: req.user.id // استخدام id بدلاً من _id
            }
        });

        res.status(201).json({ success: true, data: expense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getExpenses = async (req, res) => {
    try {
        const { startDate, endDate, category, page = 1, limit = 50 } = req.query;
        let whereClause = {};

        // بناء فلتر التاريخ
        if (startDate || endDate) {
            whereClause.date = {};
            if (startDate) whereClause.date.gte = new Date(startDate);
            if (endDate) whereClause.date.lte = new Date(new Date(endDate).setHours(23, 59, 59));
        }
        if (category) whereClause.category = category;

        // جلب المصروفات مع بيانات الصيدلي (مثل populate)
        const expenses = await prisma.expense.findMany({
            where: whereClause,
            include: {
                pharmacist: { select: { name: true } }
            },
            orderBy: { date: 'desc' },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit)
        });

        // حساب عدد النتائج
        const total = await prisma.expense.count({ where: whereClause });

        // حساب إجمالي المبالغ باستخدام aggregate (بديل لـ aggregate في Mongoose)
        const totalAmountAgg = await prisma.expense.aggregate({
            _sum: { amount: true },
            where: whereClause
        });

        res.status(200).json({
            success: true,
            count: expenses.length,
            total,
            totalAmount: totalAmountAgg._sum.amount || 0,
            data: expenses
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const expense = await prisma.expense.findUnique({
            where: { id: req.params.id }
        });

        if (!expense) {
            return res.status(404).json({ message: 'المصروف غير موجود' });
        }

        await prisma.expense.delete({
            where: { id: req.params.id }
        });

        res.status(200).json({ success: true, message: 'تم حذف المصروف بنجاح' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createExpense, getExpenses, deleteExpense };