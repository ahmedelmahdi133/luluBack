const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { 
    createProduct, 
    getProducts, 
    getProductById, // جلب تفاصيل دواء واحد بالـ IDو 
    updateProduct,
    deleteProduct,
    uploadProductImage,
    getShortagesInsights
} = require('../controllers/productController');

const { protect, authorize } = require('../middlewares/authMiddleware');

const baseUploadDir = process.env.UPLOADS_DIR || path.join(__dirname, '../../uploads');
const uploadDir = path.join(baseUploadDir, 'products');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `product-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
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

// مسارات العرض
router.get('/shortages-insights', protect, authorize('admin', 'pharmacist'), getShortagesInsights);
router.get('/', getProducts);
router.get('/:id', getProductById); // عرض دواء واحد

// مسار الإضافة (أدمن فقط)
router.post('/', protect, authorize('admin'), createProduct);
router.post('/upload-image', protect, authorize('admin'), upload.single('image'), uploadProductImage);
// مسار التعديل (أدمن فقط)
router.put('/:id', protect, authorize('admin'), updateProduct);

// مسار الحذف (أدمن فقط)
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;