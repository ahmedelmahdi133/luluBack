const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus, getTodaySales, settlePendingInvoice } = require('../controllers/orderController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.use(protect, authorize('admin', 'pharmacist'));

router.route('/')
    .get(getOrders)
    .post(createOrder);

router.get('/today-sales', getTodaySales);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/settle', settlePendingInvoice);

module.exports = router;
