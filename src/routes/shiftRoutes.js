const express = require('express');
const router = express.Router();
const { openShift, closeShift, getCurrentShift, getShifts } = require('../controllers/shiftController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.use(protect, authorize('admin', 'pharmacist'));

router.post('/open', openShift);
router.put('/close', closeShift);
router.get('/current', getCurrentShift);
router.get('/', getShifts);

module.exports = router;
