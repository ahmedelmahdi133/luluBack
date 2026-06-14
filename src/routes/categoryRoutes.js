const express = require('express');
const router = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getCategories)
    .post(protect, authorize('admin', 'pharmacist'), createCategory);

router.route('/:id')
    .put(protect, authorize('admin', 'pharmacist'), updateCategory)
    .delete(protect, authorize('admin', 'pharmacist'), deleteCategory);

module.exports = router;
