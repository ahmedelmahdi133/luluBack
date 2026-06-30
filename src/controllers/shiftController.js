const prisma = require('../config/db');
const nodemailer = require('nodemailer');

const openShift = async (req, res) => {
    try {
        const existing = await prisma.shift.findFirst({
            where: {
                pharmacistId: req.user.id,
                status: 'open'
            }
        });

        if (existing) {
            return res.status(400).json({
                message: 'لديك وردية مفتوحة بالفعل. يرجى إغلاقها أولاً'
            });
        }

        const { startingCash } = req.body;

        if (startingCash === undefined || startingCash < 0) {
            return res.status(400).json({ message: 'يرجى إدخال المبلغ الابتدائي في الدرج' });
        }

        const shift = await prisma.shift.create({
            data: {
                pharmacistId: req.user.id,
                startingCash: Number(startingCash),
                expectedCash: Number(startingCash)
            }
        });

        res.status(201).json({ success: true, data: shift });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const closeShift = async (req, res) => {
    try {
        const shift = await prisma.shift.findFirst({
            where: {
                pharmacistId: req.user.id,
                status: 'open'
            }
        });

        if (!shift) {
            return res.status(404).json({ message: 'لا توجد وردية مفتوحة حالياً' });
        }

        const { endingCash, endingVisa, notes } = req.body;

        if (endingCash === undefined || endingCash < 0) {
            return res.status(400).json({ message: 'يرجى إدخال المبلغ الفعلي في الدرج' });
        }

        if (endingVisa === undefined || endingVisa < 0) {
            return res.status(400).json({ message: 'يرجى إدخال مبلغ الفيزا الفعلي' });
        }

        // جلب الفواتير المرتبطة بالوردية
        const orders = await prisma.order.findMany({
            where: {
                shiftId: shift.id,
                status: { in: ['completed', 'delivered'] }
            }
        });

        let totalSales = 0;
        let cashSales = 0;
        let visaSales = 0;
        orders.forEach(order => {
            totalSales += order.totalAmount;
            if (order.paymentMethod === 'cash') {
                cashSales += order.totalAmount;
            } else if (order.paymentMethod === 'visa' || order.paymentMethod === 'card') {
                visaSales += order.totalAmount;
            } else if (order.paymentMethod === 'split') {
                cashSales += (order.splitCash || 0); // تذكر: قمنا بفصل الـ object في الـ Schema
                visaSales += (order.splitCard || 0);
            }
        });

        const expectedCash = shift.startingCash + cashSales;
        const expectedVisa = visaSales;

        const updatedShift = await prisma.shift.update({
            where: { id: shift.id },
            data: {
                endTime: new Date(),
                endingCash: Number(endingCash),
                expectedCash: expectedCash,
                endingVisa: Number(endingVisa),
                expectedVisa: expectedVisa,
                totalSales: totalSales,
                totalOrders: orders.length,
                status: 'closed',
                notes: notes?.trim()
            },
            include: { pharmacist: { select: { name: true } } }
        });

        // Async Email Sending
        try {
            const ownerEmailSetting = await prisma.setting.findUnique({ where: { key: 'owner_email' } });
            if (ownerEmailSetting && ownerEmailSetting.value) {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    secure: process.env.SMTP_PORT == 465,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS
                    }
                });
                
                const cashDiff = Number(endingCash) - expectedCash;
                const visaDiff = Number(endingVisa) - expectedVisa;
                
                const mailOptions = {
                    from: `"Pharmacy System" <${process.env.SMTP_USER}>`,
                    to: ownerEmailSetting.value,
                    subject: `تقفيل وردية - ${updatedShift.pharmacist?.name || 'صيدلي'}`,
                    html: `
                        <h2>تفاصيل تقفيل الوردية</h2>
                        <ul>
                            <li><strong>الصيدلي:</strong> ${updatedShift.pharmacist?.name || 'غير معروف'}</li>
                            <li><strong>بداية الوردية:</strong> ${new Date(shift.startTime).toLocaleString('ar-EG')}</li>
                            <li><strong>نهاية الوردية:</strong> ${new Date(updatedShift.endTime).toLocaleString('ar-EG')}</li>
                            <li><strong>عدد الفواتير:</strong> ${orders.length}</li>
                            <li><strong>إجمالي المبيعات:</strong> ${totalSales.toFixed(2)}</li>
                        </ul>
                        <h3>تفاصيل الكاش</h3>
                        <ul>
                            <li><strong>الكاش المتوقع:</strong> ${expectedCash.toFixed(2)}</li>
                            <li><strong>الكاش الفعلي:</strong> ${Number(endingCash).toFixed(2)}</li>
                            <li><strong>الفرق:</strong> <span style="color: ${cashDiff >= 0 ? 'green' : 'red'}">${cashDiff >= 0 ? '+' : ''}${cashDiff.toFixed(2)}</span></li>
                        </ul>
                        <h3>تفاصيل الفيزا</h3>
                        <ul>
                            <li><strong>الفيزا المتوقعة:</strong> ${expectedVisa.toFixed(2)}</li>
                            <li><strong>الفيزا الفعلية:</strong> ${Number(endingVisa).toFixed(2)}</li>
                            <li><strong>الفرق:</strong> <span style="color: ${visaDiff >= 0 ? 'green' : 'red'}">${visaDiff >= 0 ? '+' : ''}${visaDiff.toFixed(2)}</span></li>
                        </ul>
                        ${notes ? `<p><strong>ملاحظات:</strong> ${notes}</p>` : ''}
                    `
                };
                
                transporter.sendMail(mailOptions).catch(console.error); // send in background
            }
        } catch (err) {
            console.error('Error sending shift closure email:', err);
        }


        res.status(200).json({
            success: true,
            data: {
                ...updatedShift,
                cashDifference: Number(endingCash) - expectedCash,
                visaDifference: Number(endingVisa) - expectedVisa
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCurrentShift = async (req, res) => {
    try {
        const shift = await prisma.shift.findFirst({
            where: {
                pharmacistId: req.user.id,
                status: 'open'
            },
            include: {
                pharmacist: { select: { name: true } }
            }
        });

        if (!shift) {
            return res.status(200).json({ success: true, data: null });
        }

        const orders = await prisma.order.findMany({
            where: {
                shiftId: shift.id,
                status: { in: ['completed', 'delivered'] }
            }
        });

        let totalSales = 0;
        let cashSales = 0;
        let visaSales = 0;
        orders.forEach(order => {
            totalSales += order.totalAmount;
            if (order.paymentMethod === 'cash') {
                cashSales += order.totalAmount;
            } else if (order.paymentMethod === 'visa' || order.paymentMethod === 'card') {
                visaSales += order.totalAmount;
            } else if (order.paymentMethod === 'split') {
                cashSales += (order.splitCash || 0);
                visaSales += (order.splitCard || 0);
            }
        });

        res.status(200).json({
            success: true,
            data: {
                ...shift,
                totalSales,
                cashSales,
                visaSales,
                totalOrders: orders.length
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getShifts = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        
        const shifts = await prisma.shift.findMany({
            include: {
                pharmacist: { select: { name: true } }
            },
            orderBy: { createdAt: 'desc' },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit)
        });

        const total = await prisma.shift.count();

        res.status(200).json({
            success: true,
            count: shifts.length,
            total,
            data: shifts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { openShift, closeShift, getCurrentShift, getShifts };