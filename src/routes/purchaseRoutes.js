const express = require('express');
const router = express.Router();
const { createPurchase, addSupplier, getSuppliers } = require('../controllers/purchaseController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// مسارات الموردين
router.post('/suppliers', protect, authorize('admin', 'pharmacist'), addSupplier);
router.get('/suppliers', protect, authorize('admin', 'pharmacist'), getSuppliers);

// مسارات فواتير الشراء
router.post('/', protect, authorize('admin', 'pharmacist'), createPurchase);

module.exports = router;