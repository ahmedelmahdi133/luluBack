const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { 
    submitPrescription, 
    getMyPrescriptions, 
    respondToQuote, 
    getAllPrescriptions, 
    reviewPrescription,
    uploadPrescriptionImage
} = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const baseUploadDir = process.env.UPLOADS_DIR || path.join(__dirname, '../../uploads');
const uploadDir = path.join(baseUploadDir, 'prescriptions');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `rx-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) return cb(null, true);
    cb(new Error('Only image files are allowed'), false);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/', protect, authorize('customer', 'admin', 'pharmacist'), submitPrescription);
router.get('/my', protect, authorize('customer', 'admin', 'pharmacist'), getMyPrescriptions);
router.put('/:id/respond', protect, authorize('customer', 'admin', 'pharmacist'), respondToQuote);
router.post('/upload-image', protect, authorize('customer', 'admin', 'pharmacist'), upload.single('image'), uploadPrescriptionImage);

router.get('/', protect, authorize('admin', 'pharmacist'), getAllPrescriptions);
router.put('/:id/review', protect, authorize('admin', 'pharmacist'), reviewPrescription);

module.exports = router;
