require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    // List existing users
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } });
    console.log('=== Existing Users ===');
    console.table(users);

    // Update admin@lulupharma.com to admin role if exists
    const adminEmail = 'admin@lulupharma.com';
    const pharmaEmail = 'pharmacist@lulupharma.com';

    // Upsert admin
    const hashedPw = await bcrypt.hash('Admin@123', 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: { role: 'admin', password: hashedPw },
        create: { name: 'Admin', email: adminEmail, password: hashedPw, role: 'admin' }
    });
    console.log('✅ Admin user:', admin.email, '| role:', admin.role);

    const pharmacist = await prisma.user.upsert({
        where: { email: pharmaEmail },
        update: { role: 'pharmacist', password: hashedPw },
        create: { name: 'Pharmacist', email: pharmaEmail, password: hashedPw, role: 'pharmacist' }
    });
    console.log('✅ Pharmacist user:', pharmacist.email, '| role:', pharmacist.role);

    console.log('\n=== Updated Users ===');
    const all = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } });
    console.table(all);
}

main().catch(console.error).finally(() => prisma.$disconnect());
