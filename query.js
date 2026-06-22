require('dotenv').config({ path: __dirname + '/.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const p = await prisma.product.findMany({ where: { name: { contains: '1 2 3' } } });
  console.log(p.map(x => ({ id: x.id, name: x.name, stock: x.stockQuantity, online: x.isAvailableOnline })));
}
run();
