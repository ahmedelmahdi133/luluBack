const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// أي روت هنا هيعدي على الـ Middlewares دي الأول (لازم يكون مسجل دخول + أدمن)
router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .get(getUsers);

router.route('/:id')
    .delete(deleteUser);

module.exports = router;