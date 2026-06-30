require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const prisma = require('./src/config/db.js');

const EXPORT_DIR = path.join(__dirname, 'export');
const GROUPS_FILE = path.join(EXPORT_DIR, 'dbo_Product_groups.csv');
const COMPANYS_FILE = path.join(EXPORT_DIR, 'dbo_Companys.csv');
const PRODUCTS_FILE = path.join(EXPORT_DIR, 'dbo_Products.csv');

// In-memory maps to map legacy IDs to new CUIDs
const categoryMap = new Map(); // legacy group_id -> new Category CUID
const supplierMap = new Map(); // legacy company_id -> new Supplier CUID

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return resolve([]);
    }
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function migrateCategories() {
  console.log('Migrating Categories (Product_groups)...');
  const rows = await parseCSV(GROUPS_FILE);
  let count = 0;
  for (const row of rows) {
    // Removed deleted check to import all records

    const name = row.group_name_ar || row.group_name_en || `Group ${row.group_id}`;
    
    // Check if category already exists to avoid duplicates
    let category = await prisma.category.findFirst({
      where: { name: name }
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: name,
          description: row.group_name_en,
          isActive: true
        }
      });
    }
    
    categoryMap.set(row.group_id, category.id);
    count++;
  }
  console.log(`✅ Migrated ${count} categories.`);
}

async function migrateSuppliers() {
  console.log('Migrating Suppliers (Companys)...');
  const rows = await parseCSV(COMPANYS_FILE);
  let count = 0;
  for (const row of rows) {
    // Removed deleted check to import all records

    const name = row.co_name_ar || row.co_name_en || `Company ${row.company_id}`;
    
    let supplier = await prisma.supplier.findFirst({
      where: { name: name }
    });

    if (!supplier) {
      supplier = await prisma.supplier.create({
        data: {
          name: name,
          company: name,
          phone: row.mobile || row.tel || '0000000000'
        }
      });
    }

    supplierMap.set(row.company_id, supplier.id);
    count++;
  }
  console.log(`✅ Migrated ${count} suppliers.`);
}

async function migrateProducts() {
  console.log('Migrating Products...');
  const rows = await parseCSV(PRODUCTS_FILE);
  let count = 0;
  let batch = [];
  const BATCH_SIZE = 1000;

  for (const row of rows) {
    // Removed deleted check to import all records

    // Default values and fallbacks
    const barcode = row.product_int_code || `GEN_BARCODE_${row.product_id}_${Date.now()}`;
    // Format name: English - Arabic
    let name = row.product_name_en ? row.product_name_en.trim() : '';
    if (row.product_name_ar && row.product_name_ar.trim() !== '' && row.product_name_ar !== row.product_name_en) {
      name = name ? `${name} - ${row.product_name_ar.trim()}` : row.product_name_ar.trim();
    }
    if (!name) name = `Product ${row.product_id}`;
    
    const purchasingPrice = parseFloat(row.buy_price) || 0;
    const sellingPrice = parseFloat(row.sell_price) || 0;

    const categoryId = categoryMap.get(row.group_id) || null;
    const supplierId = supplierMap.get(row.company_id) || null;

    batch.push({
      name: name,
      scientificName: row.product_scientific_name || null,
      barcode: barcode,
      purchasingPrice: purchasingPrice,
      sellingPrice: sellingPrice,
      stockQuantity: 0,
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Default 1 yr
      categoryId: categoryId,
      supplierId: supplierId,
      unit: 'قطعة'
    });

    if (batch.length >= BATCH_SIZE) {
      try {
        await prisma.product.createMany({
          data: batch,
          skipDuplicates: true
        });
        count += batch.length;
        console.log(`... Migrated ${count} products so far.`);
      } catch (err) {
        console.error(`Error migrating batch:`, err.message);
      }
      batch = [];
    }
  }

  // Insert remaining
  if (batch.length > 0) {
    try {
      await prisma.product.createMany({
        data: batch,
        skipDuplicates: true
      });
      count += batch.length;
    } catch (err) {
      console.error(`Error migrating remaining batch:`, err.message);
    }
  }
  
  console.log(`✅ Migrated ${count} products.`);
}

async function main() {
  try {
    await prisma.$connect();
    await migrateCategories();
    await migrateSuppliers();
    await migrateProducts();
    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
