const express = require('express');
const router = express.Router();
const { getDailyReport, getMonthlyReport, getTopProducts, getExpiryAlerts, getLowStockAlerts } = require('../controllers/reportController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.use(protect, authorize('admin', 'pharmacist'));

router.get('/daily', getDailyReport);
router.get('/monthly', getMonthlyReport);
router.get('/top-products', getTopProducts);
router.get('/expiry-alerts', getExpiryAlerts);
router.get('/low-stock', getLowStockAlerts);

module.exports = router;
