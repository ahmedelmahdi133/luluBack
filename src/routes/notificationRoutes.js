const express = require('express');
const {
    getNotifications,
    createNotification,
    markAsRead,
    deleteNotification,
    markAllAsRead
} = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect); // All routes require authentication

router.route('/')
    .get(getNotifications)
    .post(createNotification);

router.post('/mark-all-read', markAllAsRead);

router.route('/:id')
    .put(markAsRead)
    .delete(deleteNotification);

module.exports = router;
