const express = require('express');
const router = express.Router();
const { createExpense, getExpenses, deleteExpense } = require('../controllers/expenseController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.use(protect, authorize('admin', 'pharmacist'));

router.route('/')
    .get(getExpenses)
    .post(createExpense);

router.route('/:id')
    .delete(deleteExpense);

module.exports = router;
