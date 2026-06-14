const express = require('express');
const router = express.Router();
const { getStoreProducts, getStoreProduct, getStoreCategories, createOnlineOrder, getMyOrders } = require('../controllers/storeController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/products', getStoreProducts);
router.get('/products/:id', getStoreProduct);
router.get('/categories', getStoreCategories);

router.post('/orders', protect, authorize('customer'), createOnlineOrder);
router.get('/orders/my', protect, authorize('customer'), getMyOrders);

module.exports = router;
