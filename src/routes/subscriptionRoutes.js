const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getSubscriptions, createSubscription, updateSubscription, deleteSubscription, getCustomersList } = require('../controllers/subscriptionController');

router.use(protect);
router.use(authorize('admin', 'pharmacist'));

router.get('/customers', getCustomersList);
router.route('/')
    .get(getSubscriptions)
    .post(createSubscription);

router.route('/:id')
    .put(updateSubscription)
    .delete(deleteSubscription);

module.exports = router;
