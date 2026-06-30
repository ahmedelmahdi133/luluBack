const cron = require('node-cron');
const prisma = require('../config/db');
const { sendWhatsAppMessage } = require('../services/whatsappService');

// Run every day at 10:00 AM
const startReminderCron = () => {
    cron.schedule('0 10 * * *', async () => {
        console.log('[Cron] Running daily WhatsApp medication reminder check...');
        try {
            // Find subscriptions due in exactly 2 days
            const targetDateStart = new Date();
            targetDateStart.setDate(targetDateStart.getDate() + 2);
            targetDateStart.setHours(0, 0, 0, 0);

            const targetDateEnd = new Date(targetDateStart);
            targetDateEnd.setHours(23, 59, 59, 999);

            const dueSubscriptions = await prisma.monthlySubscription.findMany({
                where: {
                    isActive: true,
                    nextDueDate: {
                        gte: targetDateStart,
                        lte: targetDateEnd
                    }
                },
                include: {
                    customer: true,
                    product: true
                }
            });

            console.log(`[Cron] Found ${dueSubscriptions.length} subscriptions due in 2 days.`);

            // Get pharmacists/admins to send app notifications to
            const staff = await prisma.user.findMany({
                where: { role: { in: ['admin', 'pharmacist'] }, isActive: true }
            });

            for (const sub of dueSubscriptions) {
                if (sub.customer.phone) {
                    const message = `مرحباً ${sub.customer.name}،\nنود تذكيرك بأن موعد تجديد الدواء الشهري (${sub.product.name}) سيكون بعد يومين.\nيرجى التواصل معنا لتأكيد الطلب.\nمع تحيات صيدليتنا.`;
                    
                    // Send WhatsApp
                    // Clean phone number (ensure international format if possible, e.g., +201...)
                    // For UltraMsg, typically requires country code without +
                    let phone = sub.customer.phone.replace(/\+/g, '');
                    if (phone.startsWith('01')) phone = '2' + phone; // Egyptian format assuming mostly Egypt. Adjust if needed.

                    await sendWhatsAppMessage(phone, message);

                    // Notify pharmacists
                    for (const s of staff) {
                        await prisma.notification.create({
                            data: {
                                userId: s.id,
                                type: 'whatsapp_reminder',
                                title: 'تذكير دواء شهري',
                                message: `تم إرسال تذكير للعميل ${sub.customer.name} بخصوص الدواء ${sub.product.name}`,
                                productId: sub.productId,
                            }
                        });
                    }

                    // Advance nextDueDate by 1 month
                    const nextDate = new Date(sub.nextDueDate);
                    nextDate.setMonth(nextDate.getMonth() + 1);

                    await prisma.monthlySubscription.update({
                        where: { id: sub.id },
                        data: { nextDueDate: nextDate }
                    });
                }
            }

        } catch (error) {
            console.error('[Cron] Error running reminder cron:', error);
        }
    });
};

module.exports = startReminderCron;
