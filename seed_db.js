require('dotenv').config();
const prisma = require('./src/config/db.js');
const fs = require('fs');
const path = require('path');
async function main() {
  console.log('Loading products_db_ready.json...');
  const filePath = path.join(__dirname, 'products_db_ready.json');
  
  if (!fs.existsSync(filePath)) {
    console.error('File products_db_ready.json not found! Please run convert_products.js first.');
    process.exit(1);
  }

  const fileData = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(fileData);

  console.log(`Ready to insert ${products.length} products in batches...`);
  
  const BATCH_SIZE = 500; // Safe batch size
  let insertedCount = 0;

  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    
    try {
      await prisma.product.createMany({
        data: batch,
        skipDuplicates: true, // Prevents errors if a barcode already exists
      });
      insertedCount += batch.length;
      console.log(`Inserted ${insertedCount} / ${products.length} products...`);
    } catch (error) {
      console.error(`Error inserting batch ${i}:`, error.message);
    }
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
