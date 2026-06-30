const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getSettings, updateSettings } = require('../controllers/settingsController');

router.use(protect);

router.route('/')
    .get(getSettings) // anyone logged in can read settings (or we can restrict to admin if needed, but it might be useful for frontend to know settings)
    .put(authorize('admin'), updateSettings);

module.exports = router;
