// حقن رابط الاتصال في متغيرات البيئة مباشرة لتجاوز خطأ الـ Constructor
process.env.DATABASE_URL = "postgresql://postgres:1231@localhost:5433/lulu";

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// استدعاء Prisma بدون أي معاملات (سيقرأ الرابط المحقون في السطر الأول)
const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Starting user creation...');
  
  // تشفير كلمة المرور
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  try {
    const user = await prisma.user.create({
      data: {
        name: 'Ahmed Pharmacist',
        email: 'pharmacist@lulua.com',
        password: hashedPassword, 
        role: 'pharmacist', // يجب أن يتطابق مع الـ enum في الـ schema
        isActive: true,
      },
    });
    console.log('✅ Pharmacist created successfully:', user.email);
  } catch (error) {
    if (error.code === 'P2002') {
      console.error('❌ Error: User already exists. (البريد الإلكتروني موجود بالفعل)');
    } else {
      console.error('❌ Error details:', error);
    }
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed.');
  });