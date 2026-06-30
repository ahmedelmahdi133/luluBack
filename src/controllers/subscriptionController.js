const prisma = require('../config/db');

const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await prisma.monthlySubscription.findMany({
            include: {
                customer: { select: { name: true, phone: true } },
                product: { select: { name: true, barcode: true } }
            },
            orderBy: { nextDueDate: 'asc' }
        });
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSubscription = async (req, res) => {
    try {
        const { customerId, productId, startDate, notes } = req.body;

        if (!customerId || !productId || !startDate) {
            return res.status(400).json({ message: 'Customer, Product, and Start Date are required' });
        }

        const start = new Date(startDate);
        const nextDueDate = new Date(start);
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);

        const subscription = await prisma.monthlySubscription.create({
            data: {
                customerId,
                productId,
                startDate: start,
                nextDueDate,
                notes
            },
            include: {
                customer: { select: { name: true, phone: true } },
                product: { select: { name: true } }
            }
        });

        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSubscription = async (req, res) => {
    try {
        const { isActive, nextDueDate, notes } = req.body;
        const updates = {};
        if (isActive !== undefined) updates.isActive = isActive;
        if (nextDueDate) updates.nextDueDate = new Date(nextDueDate);
        if (notes !== undefined) updates.notes = notes;

        const subscription = await prisma.monthlySubscription.update({
            where: { id: req.params.id },
            data: updates,
            include: {
                customer: { select: { name: true, phone: true } },
                product: { select: { name: true } }
            }
        });

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSubscription = async (req, res) => {
    try {
        await prisma.monthlySubscription.delete({ where: { id: req.params.id } });
        res.status(200).json({ success: true, message: 'Subscription deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCustomersList = async (req, res) => {
    try {
        const customers = await prisma.user.findMany({
            where: { role: 'customer' },
            select: { id: true, name: true, phone: true }
        });
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription,
    getCustomersList
};
