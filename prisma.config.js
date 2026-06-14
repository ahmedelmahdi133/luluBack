// بما أن متغيرات البيئة لا يتم تحميلها تلقائياً في ملفات إعدادات Prisma، يجب استدعاء dotenv
require('dotenv/config'); 
const { defineConfig, env } = require('prisma/config');

module.exports = defineConfig({
  engine: 'classic', 
  datasource: {
    url: env('DATABASE_URL')
  }
});