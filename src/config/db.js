const { PrismaClient } = require('@prisma/client');

let prisma;

if (process.env.DESKTOP_MODE === 'true') {
  // للنسخة المكتبية، PrismaClient يعمل مع محول SQLite المحلي

  const { PrismaLibSql } = require('@prisma/adapter-libsql');
  
  const dbPath = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'file:./dev.db';
  process.env.DATABASE_URL = dbPath; // تحديث المتغير حتى لا يعطي Prisma خطأ
  
  const adapter = new PrismaLibSql({ url: dbPath });
  
  prisma = new PrismaClient({ adapter });
} else {
  // إعداد الاتصال بقاعدة بيانات PostgreSQL للنسخة السحابية أو التطوير
  const { PrismaPg } = require('@prisma/adapter-pg');
  const { Pool } = require('pg');
  
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  // تمرير الـ adapter إلى PrismaClient
  prisma = new PrismaClient({ adapter });
}

module.exports = prisma;