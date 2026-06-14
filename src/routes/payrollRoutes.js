const express = require('express');
const router = express.Router();
const { calculatePayroll, getEmployees, updateEmployeeRate } = require('../controllers/payrollController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.use(protect, authorize('admin'));

router.get('/calculate', calculatePayroll);
router.get('/employees', getEmployees);
router.put('/employees/:id/rate', updateEmployeeRate);

module.exports = router;
