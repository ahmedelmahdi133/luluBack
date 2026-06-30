const express = require('express');
const router = express.Router();
const { registerUser, registerStaff, loginUser, logoutUser, getMe, updateProfile } = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/register-staff', protect, authorize('admin'), registerStaff);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
