const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'products.json');
const outputFilePath = path.join(__dirname, 'products_db_ready.json');

console.log('Reading products.json...');
const fileData = fs.readFileSync(inputFilePath, 'utf8');
const data = JSON.parse(fileData);
const drugs = data.drugs || [];

console.log(`Found ${drugs.length} products. Transforming data...`);

const transformedProducts = drugs.map((drug, index) => {
  const sellingPrice = parseFloat(drug.new_price) || 0;
  
  return {
    // id: drug.id, // Uncomment if you want to keep the original string ID, but Prisma uses cuid() by default
    name: drug.tradename || 'بدون اسم',
    scientificName: drug.activeingredient || null,
    barcode: drug.id || `barcode_${index}_${Date.now()}`, // Using drug ID as barcode since it's unique
    description: [drug.group, drug.pharmacology].filter(Boolean).join('\n') || null,
    purchasingPrice: sellingPrice, // Default purchasing price
    sellingPrice: sellingPrice,
    stockQuantity: 0,
    minStockAlert: 10,
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(), // Default expiry: 1 year from now
    requiresPrescription: false,
    isAvailableOnline: true,
    unit: drug.form || 'قطعة',
  };
});

fs.writeFileSync(outputFilePath, JSON.stringify(transformedProducts, null, 2), 'utf8');
console.log(`Successfully created ${outputFilePath} with ${transformedProducts.length} formatted records.`);
