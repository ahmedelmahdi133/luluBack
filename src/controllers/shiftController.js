const prisma = require('../config/db');

const openShift = async (req, res) => {
    try {
        const existing = await prisma.shift.findFirst({
            where: {
                pharmacistId: req.user.id,
                status: 'open'
            }
        });

        if (existing) {
            return res.status(400).json({
                message: 'لديك وردية مفتوحة بالفعل. يرجى إغلاقها أولاً'
            });
        }

        const { startingCash } = req.body;

        if (startingCash === undefined || startingCash < 0) {
            return res.status(400).json({ message: 'يرجى إدخال المبلغ الابتدائي في الدرج' });
        }

        const shift = await prisma.shift.create({
            data: {
                pharmacistId: req.user.id,
                startingCash: Number(startingCash),
                expectedCash: Number(startingCash)
            }
        });

        res.status(201).json({ success: true, data: shift });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const closeShift = async (req, res) => {
    try {
        const shift = await prisma.shift.findFirst({
            where: {
                pharmacistId: req.user.id,
                status: 'open'
            }
        });

        if (!shift) {
            return res.status(404).json({ message: 'لا توجد وردية مفتوحة حالياً' });
        }

        const { endingCash, notes } = req.body;

        if (endingCash === undefined || endingCash < 0) {
            return res.status(400).json({ message: 'يرجى إدخال المبلغ الفعلي في الدرج' });
        }

        // جلب الفواتير المرتبطة بالوردية
        const orders = await prisma.order.findMany({
            where: {
                shiftId: shift.id,
                status: { in: ['completed', 'delivered'] }
            }
        });

        let totalSales = 0;
        let cashSales = 0;
        orders.forEach(order => {
            totalSales += order.totalAmount;
            if (order.paymentMethod === 'cash') {
                cashSales += order.totalAmount;
            } else if (order.paymentMethod === 'split') {
                cashSales += (order.splitCash || 0); // تذكر: قمنا بفصل الـ object في الـ Schema
            }
        });

        const expectedCash = shift.startingCash + cashSales;

        const updatedShift = await prisma.shift.update({
            where: { id: shift.id },
            data: {
                endTime: new Date(),
                endingCash: Number(endingCash),
                expectedCash: expectedCash,
                totalSales: totalSales,
                totalOrders: orders.length,
                status: 'closed',
                notes: notes?.trim()
            }
        });

        res.status(200).json({
            success: true,
            data: {
                ...updatedShift,
                cashDifference: Number(endingCash) - expectedCash
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCurrentShift = async (req, res) => {
    try {
        const shift = await prisma.shift.findFirst({
            where: {
                pharmacistId: req.user.id,
                status: 'open'
            },
            include: {
                pharmacist: { select: { name: true } }
            }
        });

        if (!shift) {
            return res.status(200).json({ success: true, data: null });
        }

        const orders = await prisma.order.findMany({
            where: {
                shiftId: shift.id,
                status: { in: ['completed', 'delivered'] }
            }
        });

        let totalSales = 0;
        orders.forEach(order => { totalSales += order.totalAmount; });

        res.status(200).json({
            success: true,
            data: {
                ...shift,
                totalSales,
                totalOrders: orders.length
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getShifts = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        
        const shifts = await prisma.shift.findMany({
            include: {
                pharmacist: { select: { name: true } }
            },
            orderBy: { createdAt: 'desc' },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit)
        });

        const total = await prisma.shift.count();

        res.status(200).json({
            success: true,
            count: shifts.length,
            total,
            data: shifts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { openShift, closeShift, getCurrentShift, getShifts };