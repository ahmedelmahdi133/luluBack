const prisma = require('../config/db');

const calculatePayroll = async (req, res) => {
    try {
        const { month, year } = req.query;
        if (!month || !year) {
            return res.status(400).json({ message: 'month and year are required' });
        }

        const m = parseInt(month) - 1;
        const y = parseInt(year);
        const startDate = new Date(y, m, 1);
        const endDate = new Date(y, m + 1, 0, 23, 59, 59, 999);

        // جلب الموظفين (أدمن وصيادلة)
        const staff = await prisma.user.findMany({
            where: {
                role: { in: ['admin', 'pharmacist'] },
                isActive: true
            },
            select: { id: true, name: true, email: true, role: true, monthlyHourlyRate: true }
        });

        const staffIds = staff.map(s => s.id);

        // جلب سجلات الحضور في هذا الشهر لهؤلاء الموظفين
        const attendanceRecords = await prisma.attendance.findMany({
            where: {
                date: { gte: startDate, lte: endDate },
                employeeId: { in: staffIds }
            }
        });

        const attendanceMap = {};
        for (const record of attendanceRecords) {
            const empId = record.employeeId;
            if (!attendanceMap[empId]) {
                attendanceMap[empId] = { totalHours: 0, workingDays: 0 };
            }
            attendanceMap[empId].totalHours += record.totalHours || 0;
            if (record.totalHours > 0) {
                attendanceMap[empId].workingDays += 1;
            }
        }

        const payroll = staff.map(employee => {
            const att = attendanceMap[employee.id] || { totalHours: 0, workingDays: 0 };
            const salary = (att.totalHours / 26) * (employee.monthlyHourlyRate || 0);

            return {
                employeeId: employee.id,
                name: employee.name,
                email: employee.email,
                role: employee.role,
                monthlyHourlyRate: employee.monthlyHourlyRate || 0,
                totalHours: Math.round(att.totalHours * 100) / 100,
                workingDays: att.workingDays,
                calculatedSalary: Math.round(salary * 100) / 100
            };
        });

        const totalPayroll = payroll.reduce((sum, p) => sum + p.calculatedSalary, 0);

        res.status(200).json({
            success: true,
            month: parseInt(month),
            year: y,
            data: payroll,
            totalPayroll: Math.round(totalPayroll * 100) / 100
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.user.findMany({
            where: {
                role: { in: ['admin', 'pharmacist'] },
                isActive: true
            },
            select: { id: true, name: true, email: true, role: true, phone: true, monthlyHourlyRate: true, createdAt: true }
        });

        res.status(200).json({ success: true, count: employees.length, data: employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEmployeeRate = async (req, res) => {
    try {
        const { monthlyHourlyRate } = req.body;

        if (monthlyHourlyRate === undefined || monthlyHourlyRate < 0) {
            return res.status(400).json({ message: 'Valid monthlyHourlyRate is required' });
        }

        const employeeExists = await prisma.user.findUnique({ where: { id: req.params.id } });
        if (!employeeExists) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const employee = await prisma.user.update({
            where: { id: req.params.id },
            data: { monthlyHourlyRate: Number(monthlyHourlyRate) },
            select: { id: true, name: true, email: true, role: true, monthlyHourlyRate: true }
        });

        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { calculatePayroll, getEmployees, updateEmployeeRate };