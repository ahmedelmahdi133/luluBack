require('dotenv').config();
const prisma = require('./src/config/db');

async function test() {
    const p = await prisma.purchase.findUnique({
        where: { id: 'cmqp577pe0000uscp2s4vif34' },
        include: { items: true }
    });
    console.log(JSON.stringify(p.items, null, 2));
    await prisma.$disconnect();
}
test();
