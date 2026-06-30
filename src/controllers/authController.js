const bcrypt = require('bcryptjs');
const prisma = require('../config/db'); // استدعاء Prisma Client
const generateToken = require('../utils/generateToken');

const getCookieOptions = (expires) => ({
    expires,
    httpOnly: true,
    secure: process.env.DESKTOP_MODE !== 'true' && process.env.NODE_ENV === 'production',
    sameSite: process.env.DESKTOP_MODE === 'true'
        ? 'lax'
        : (process.env.NODE_ENV === 'production' ? 'none' : 'lax')
});

const sendTokenResponse = (user, statusCode, res) => {
    // في Prisma نستخدم user.id بدلاً من user._id
    const token = generateToken(user.id);

    const options = getCookieOptions(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            permissions: user.permissions
        }
    });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'كلمة المرور يجب أن لا تقل عن 8 أحرف' });
        }

        const normalizedEmail = email.toLowerCase().trim();
        
        // استخدام findUnique بدلاً من findOne للبحث عن الإيميل
        const userExists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (userExists) {
            return res.status(400).json({ message: 'البريد الإلكتروني مسجل بالفعل' });
        }

        // تشفير كلمة المرور يدوياً لأن Prisma لا تدعم pre('save') hooks
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // إنشاء المستخدم
        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
                phone: phone?.trim(),
                address: address?.trim(),
                role: 'customer' // يتطابق مع الـ Enum UserRole
            }
        });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerStaff = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة' });
        }

        const allowedRoles = ['admin', 'pharmacist'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: 'صلاحية غير صالحة' });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const userExists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (userExists) {
            return res.status(400).json({ message: 'البريد الإلكتروني مسجل بالفعل' });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
                phone: phone?.trim(),
                role
            }
        });

        res.status(201).json({
            success: true,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' });
        }

        // في Prisma لا نحتاج إلى select('+password') لأنها تعيد جميع الحقول افتراضياً
        const user = await prisma.user.findUnique({ 
            where: { email: email.toLowerCase().trim() } 
        });

        if (!user) {
            return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'الحساب معطل. تواصل مع الإدارة' });
        }

        // مقارنة كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = async (req, res) => {
    res.cookie('token', 'none', getCookieOptions(new Date(Date.now() + 5 * 1000)));

    res.status(200).json({ success: true, message: 'تم تسجيل الخروج بنجاح' });
};

const getMe = async (req, res) => {
    // نفترض أن الـ Auth Middleware تم تعديله ليحفظ req.user.id
    res.status(200).json({ success: true, data: req.user });
};

const updateProfile = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const updates = {};
        
        if (name) updates.name = name.trim();
        if (phone !== undefined) updates.phone = phone.trim();
        if (address !== undefined) updates.address = address.trim();

        const user = await prisma.user.update({
            where: { id: req.user.id }, // استخدام .id
            data: updates,
            // تحديد الحقول التي نريد إرجاعها حتى لا ترجع كلمة المرور
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                address: true,
                role: true,
                permissions: true
            }
        });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, registerStaff, loginUser, logoutUser, getMe, updateProfile };