require('dotenv').config();
const prisma = require('./src/config/db.js');

async function main() {
  console.log('Deleting all products...');
  await prisma.product.deleteMany({});
  console.log('Products deleted.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
