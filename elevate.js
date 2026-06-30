require('dotenv').config();
const prisma = require('./src/config/db');

async function run() {
    try {
        const users = await prisma.user.findMany({ where: { role: 'admin' } });
        if (users.length > 0) {
            await prisma.user.updateMany({
                where: { role: 'admin' },
                data: { role: 'superadmin' }
            });
            console.log(`Successfully elevated ${users.length} admin(s) to superadmin.`);
        } else {
            console.log('No admins found to elevate.');
        }
    } catch (error) {
        console.error('Error elevating users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

run();
