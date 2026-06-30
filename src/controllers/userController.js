const prisma = require('../config/db');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            // بنحدد الحقول اللي هترجع عشان نمنع إرسال الباسورد للفرونت إند
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                permissions: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc' // أحدث المستخدمين يظهروا الأول
            }
        });
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete or Deactivate a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // منع المدير من حذف نفسه بالخطأ
        if (req.user.id === id) {
            return res.status(400).json({ message: 'لا يمكنك حذف حسابك الشخصي من هنا' });
        }

        const userExists = await prisma.user.findUnique({ where: { id } });
        if (!userExists) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        try {
            // محاولة الحذف النهائي من قاعدة البيانات
            await prisma.user.delete({
                where: { id }
            });
            res.status(200).json({ success: true, message: 'تم حذف المستخدم نهائياً' });

        } catch (dbError) {
            // لو فشل الحذف بسبب ارتباط اليوزر بمبيعات أو ورديات، هنعمله تعطيل (Deactivate) بدل الحذف
            if (dbError.code === 'P2003') { // كود الخطأ الخاص بالـ Foreign Key في Prisma
                await prisma.user.update({
                    where: { id },
                    data: { isActive: false }
                });
                return res.status(200).json({ 
                    success: true, 
                    message: 'تم تعطيل حساب المستخدم بدلاً من حذفه للحفاظ على سجلات مبيعاته' 
                });
            }
            throw dbError;
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user permissions
// @route   PUT /api/users/:id/permissions
// @access  Private/SuperAdmin
const updateUserPermissions = async (req, res) => {
    try {
        const { id } = req.params;
        const { permissions } = req.body;

        const userExists = await prisma.user.findUnique({ where: { id } });
        if (!userExists) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { permissions }
        });

        res.status(200).json({ 
            success: true, 
            message: 'تم تحديث الصلاحيات بنجاح',
            data: updatedUser.permissions 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, deleteUser, updateUserPermissions };