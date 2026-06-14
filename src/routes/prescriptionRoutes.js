const express = require('express');
const router = express.Router();
const { submitPrescription, getMyPrescriptions, respondToQuote, getAllPrescriptions, reviewPrescription } = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, authorize('customer'), submitPrescription);
router.get('/my', protect, authorize('customer'), getMyPrescriptions);
router.put('/:id/respond', protect, authorize('customer'), respondToQuote);

router.get('/', protect, authorize('admin', 'pharmacist'), getAllPrescriptions);
router.put('/:id/review', protect, authorize('admin', 'pharmacist'), reviewPrescription);

module.exports = router;
