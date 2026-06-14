const prisma = require('../config/db');

const getStartOfDay = (d = new Date()) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date;
};

const checkIn = async (req, res) => {
    try {
        const today = getStartOfDay();
        
        // التحقق من وجود تسجيل حضور سابق لنفس اليوم ونفس الموظف
        const existing = await prisma.attendance.findUnique({
            where: {
                employeeId_date: {
                    employeeId: req.user.id,
                    date: today
                }
            }
        });

        if (existing) {
            return res.status(400).json({ message: 'Already checked in today' });
        }

        const attendance = await prisma.attendance.create({
            data: {
                employeeId: req.user.id,
                date: today,
                checkIn: new Date(),
                status: 'present'
            }
        });

        res.status(201).json({ success: true, data: attendance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkOut = async (req, res) => {
    try {
        const today = getStartOfDay();
        const attendance = await prisma.attendance.findUnique({
            where: {
                employeeId_date: {
                    employeeId: req.user.id,
                    date: today
                }
            }
        });

        if (!attendance) {
            return res.status(400).json({ message: 'No check-in found for today' });
        }
        if (attendance.checkOut) {
            return res.status(400).json({ message: 'Already checked out today' });
        }

        const checkOutTime = new Date();
        const diffMs = checkOutTime - attendance.checkIn;
        const totalHours = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;

        let status = attendance.status;
        if (totalHours < 4) {
            status = 'half_day';
        }

        const updatedAttendance = await prisma.attendance.update({
            where: { id: attendance.id },
            data: {
                checkOut: checkOutTime,
                totalHours: totalHours,
                status: status
            }
        });

        res.status(200).json({ success: true, data: updatedAttendance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodayStatus = async (req, res) => {
    try {
        const today = getStartOfDay();
        const attendance = await prisma.attendance.findUnique({
            where: {
                employeeId_date: {
                    employeeId: req.user.id,
                    date: today
                }
            }
        });

        res.status(200).json({ success: true, data: attendance || null });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAttendance = async (req, res) => {
    try {
        const { employeeId, startDate, endDate } = req.query;
        let whereClause = {};

        if (employeeId) whereClause.employeeId = employeeId;
        if (startDate || endDate) {
            whereClause.date = {};
            if (startDate) whereClause.date.gte = getStartOfDay(new Date(startDate));
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                whereClause.date.lte = end;
            }
        }

        const records = await prisma.attendance.findMany({
            where: whereClause,
            include: {
                employee: { select: { name: true, email: true, role: true } }
            },
            orderBy: { date: 'desc' }
        });

        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyAttendance = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let whereClause = { employeeId: req.user.id };

        if (startDate || endDate) {
            whereClause.date = {};
            if (startDate) whereClause.date.gte = getStartOfDay(new Date(startDate));
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                whereClause.date.lte = end;
            }
        }

        const records = await prisma.attendance.findMany({
            where: whereClause,
            orderBy: { date: 'desc' }
        });

        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const manualEntry = async (req, res) => {
    try {
        const { employeeId, date, checkIn, checkOut, status, notes } = req.body;

        if (!employeeId || !date || !checkIn) {
            return res.status(400).json({ message: 'employeeId, date, and checkIn are required' });
        }

        const dayDate = getStartOfDay(new Date(date));
        let totalHours = 0;

        if (checkOut) {
            const diffMs = new Date(checkOut) - new Date(checkIn);
            totalHours = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
        }

        // استخدام upsert بدلاً من findOneAndUpdate لإنشاء أو تحديث السجل
        const attendance = await prisma.attendance.upsert({
            where: {
                employeeId_date: {
                    employeeId: employeeId,
                    date: dayDate
                }
            },
            update: {
                checkIn: new Date(checkIn),
                checkOut: checkOut ? new Date(checkOut) : null,
                totalHours: totalHours,
                status: status || 'present',
                notes: notes
            },
            create: {
                employeeId: employeeId,
                date: dayDate,
                checkIn: new Date(checkIn),
                checkOut: checkOut ? new Date(checkOut) : null,
                totalHours: totalHours,
                status: status || 'present',
                notes: notes
            }
        });

        res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        // التحقق من تكرار الإدخال
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'Attendance record already exists for this date' });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = { checkIn, checkOut, getTodayStatus, getAttendance, getMyAttendance, manualEntry };