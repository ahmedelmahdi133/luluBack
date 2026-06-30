require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const prisma = require('./src/config/db.js');

const EXPORT_DIR = path.join(__dirname, 'export');
const PRODUCTS_FILE = path.join(EXPORT_DIR, 'dbo_Products.csv');

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    if (!fs.existsSync(filePath)) return resolve([]);
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

async function updateProducts() {
  console.log('Updating Product names...');
  const rows = await parseCSV(PRODUCTS_FILE);
  let updated = 0;
  let batch = [];
  
  for (const row of rows) {
    const barcode = row.product_int_code || `GEN_BARCODE_${row.product_id}`;
    let name = row.product_name_en ? row.product_name_en.trim() : '';
    if (row.product_name_ar && row.product_name_ar.trim() !== '' && row.product_name_ar !== row.product_name_en) {
      name = name ? `${name} - ${row.product_name_ar.trim()}` : row.product_name_ar.trim();
    }
    if (!name) name = `Product ${row.product_id}`;

    batch.push(prisma.product.updateMany({
      where: { barcode: barcode },
      data: { name: name }
    }));

    if (batch.length >= 500) {
      await Promise.all(batch);
      updated += batch.length;
      console.log(`Updated ${updated} products so far...`);
      batch = [];
    }
  }

  if (batch.length > 0) {
    await Promise.all(batch);
    updated += batch.length;
  }
  
  console.log(`✅ Finished updating ${updated} product names!`);
}

updateProducts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
