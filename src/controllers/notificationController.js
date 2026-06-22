const prisma = require('../config/db');

// Get all notifications for the logged-in user
const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await prisma.notification.findMany({
            where: { userId },
            include: { product: { select: { name: true, stockQuantity: true } } },
            orderBy: { createdAt: 'desc' },
            take: 50 // Limit to last 50
        });
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new reminder/notification
const createNotification = async (req, res) => {
    try {
        const { title, message, type, productId, dueDate } = req.body;
        const userId = req.user.id;

        const notification = await prisma.notification.create({
            data: {
                userId,
                title,
                message,
                type: type || 'reminder',
                productId: productId || null,
                dueDate: dueDate ? new Date(dueDate) : null
            }
        });

        res.status(201).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const notification = await prisma.notification.updateMany({
            where: { id, userId },
            data: { isRead: true }
        });

        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        await prisma.notification.deleteMany({
            where: { id, userId }
        });

        res.status(200).json({ success: true, message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Bulk mark all as read
const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        await prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true }
        });
        res.status(200).json({ success: true, message: 'All marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotifications,
    createNotification,
    markAsRead,
    deleteNotification,
    markAllAsRead
};
