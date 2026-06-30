require('dotenv').config();
const prisma = require('./src/config/db');

async function test() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: 'a.elmahdi13@gmail.com' } // Using the user's email
        });
        console.log('Result:', user);
    } catch (error) {
        console.error('Full Error String:\n', error.toString());
        console.error('Full Error Message:\n', error.message);
    } finally {
        await prisma.$disconnect();
    }
}
test();
