const jwt = require('jsonwebtoken');
const prisma = require('../config/db'); // استدعاء Prisma بدلاً من Mongoose User

const protect = async (req, res, next) => {
    let token;

    // التحقق من وجود التوكن في الهيدر أو الكوكيز
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token || token === 'none') {
        return res.status(401).json({ message: 'غير مصرح لك بالوصول، يرجى تسجيل الدخول أولاً' });
    }

    try {
        // فك تشفير التوكن
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // البحث عن المستخدم باستخدام Prisma
        req.user = await prisma.user.findUnique({
            where: { id: decoded.id },
            // جلب البيانات الأساسية فقط وتجاهل كلمة المرور لأسباب أمنية
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isActive: true
            }
        });

        if (!req.user) {
            return res.status(401).json({ message: 'المستخدم غير موجود' });
        }

        if (!req.user.isActive) {
            return res.status(403).json({ message: 'هذا الحساب معطل، يرجى التواصل مع الإدارة' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'غير مصرح لك بالوصول، جلسة غير صالحة أو منتهية' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `صلاحية (${req.user.role}) غير كافية للقيام بهذا الإجراء` 
            });
        }
        next();
    };
};

module.exports = { protect, authorize };