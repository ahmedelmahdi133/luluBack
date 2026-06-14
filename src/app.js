const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// استدعاء Prisma بدلاً من دالة connectDB القديمة الخاصة بـ Mongoose
const prisma = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const returnRoutes = require('./routes/returnRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const reportRoutes = require('./routes/reportRoutes');
const storeRoutes = require('./routes/storeRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const payrollRoutes = require('./routes/payrollRoutes');

const app = express();

// =========================
// Security Middlewares
// =========================

// مهم جداً لكي يعمل الـ Rate Limit بشكل صحيح خلف الـ Proxies (Nginx, Render, etc.)
app.set('trust proxy', 1);

app.use(helmet());

const envOrigins = (process.env.FRONTEND_URLS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000',
    process.env.FRONTEND_URL,
    ...envOrigins
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    validate: false,
    message: { status: 'error', message: 'Too many login attempts. Try again in 15 minutes.' }
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    validate: false,
    message: { status: 'error', message: 'Too many requests. Try again later.' }
});

// 1. تطبيق الـ Limiters
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api', apiLimiter);

// =========================
// 2. Body Parsing (مهم جداً يكون هنا قبل أي روت)
// =========================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// =========================
// 3. API Routes
// =========================

// مسار فحص الصحة
app.get('/api/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({
            status: 'success',
            message: 'API & PostgreSQL Database are running smoothly'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed'
        });
    }
});

// تجميع كل الروتس هنا بعد الـ JSON Parser
app.use('/api/auth', authRoutes);
app.use('/api/users', require('./routes/userRoutes')); // تم نقلها هنا
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/returns', returnRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll', payrollRoutes);

// =========================
// Desktop App - Serve Frontend
// =========================

if (process.env.DESKTOP_MODE === 'true') {
    const frontendDist = process.env.FRONTEND_DIST_PATH;
    if (frontendDist && fs.existsSync(frontendDist)) {
        app.use(express.static(frontendDist));
        app.get(/^(?!\/api).*/, (req, res) => {
            res.sendFile(path.join(frontendDist, 'index.html'));
        });
    }
}

// =========================
// Global Error Handler
// =========================

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message
    });
});

app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Route not found' });
});

// =========================
// Start Server
// =========================

const PORT = process.env.PORT || 5000;

// تشغيل السيرفر والتأكد من الاتصال بالقاعدة أولاً
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Successfully connected to PostgreSQL via Prisma');
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to connect to the database:', error);
        process.exit(1); // إغلاق التطبيق في حال فشل الاتصال
    }
};

// إغلاق الاتصال بقاعدة البيانات بشكل آمن عند إيقاف السيرفر
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('\n🛑 Disconnected from database.');
    process.exit(0);
});

startServer();

module.exports = app;