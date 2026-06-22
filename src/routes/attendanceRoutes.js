const express = require('express');
const router = express.Router();
const { checkIn, checkOut, getTodayStatus, getAttendance, getMyAttendance, manualEntry } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.use(protect, authorize('admin', 'pharmacist'));

router.post('/check-in', checkIn);
router.post('/check-out', checkOut);
router.get('/today', getTodayStatus);
router.get('/my', getMyAttendance);

router.get('/', authorize('admin'), getAttendance);
router.post('/manual', authorize('admin'), manualEntry);

module.exports = router;
