const express = require('express');
const router = express.Router();
const { createSalesReturn, createPurchaseReturn, getReturns, searchOrder, searchPurchase } = require('../controllers/returnController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.use(protect, authorize('admin', 'pharmacist'));

router.get('/', getReturns);
router.post('/sales', createSalesReturn);
router.post('/purchase', createPurchaseReturn);
router.get('/search-order', searchOrder);
router.get('/search-purchase', searchPurchase);

module.exports = router;
