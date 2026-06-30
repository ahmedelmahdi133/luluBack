require('dotenv').config();
const prisma = require('./src/config/db.js');

async function main() {
  try {
    // 1. Get or create a Pharmacist
    let pharmacist = await prisma.user.findFirst({ where: { role: { in: ['admin', 'pharmacist'] } } });
    if (!pharmacist) {
      pharmacist = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin_cosmetics@pharma.com',
          password: 'password123',
          role: 'admin',
        }
      });
    }

    // 2. Get or create a Supplier
    let supplier = await prisma.supplier.findFirst({ where: { name: 'Cosmetics Distributor' } });
    if (!supplier) {
      supplier = await prisma.supplier.create({
        data: {
          name: 'Cosmetics Distributor',
          company: 'Cosmetics Co',
          phone: '01000000000'
        }
      });
    }

    // 3. Define the products
    const productsData = [
      {
        name: 'La Roche-Posay Effaclar Gel - غسول لاروش بوزيه',
        scientificName: 'Purifying Foaming Gel',
        barcode: '3337872411083',
        description: 'Purifying foaming gel for oily sensitive skin.',
        image: 'https://m.media-amazon.com/images/I/51v+l73fQUL._SX400_SY400_.jpg',
        purchasingPrice: 350,
        sellingPrice: 450,
        stockQuantity: 50,
        expiryDate: new Date('2026-12-31'),
        isAvailableOnline: true
      },
      {
        name: 'Vichy Mineral 89 Serum - سيروم فيتشي مينيرال',
        scientificName: 'Hyaluronic Acid Serum',
        barcode: '3337875543248',
        description: 'Daily skin booster and hydrating serum.',
        image: 'https://m.media-amazon.com/images/I/51bJv2hMktL._SX400_SY400_.jpg',
        purchasingPrice: 600,
        sellingPrice: 750,
        stockQuantity: 30,
        expiryDate: new Date('2026-10-15'),
        isAvailableOnline: true
      },
      {
        name: 'CeraVe Hydrating Cleanser - غسول سيرافي المرطب',
        scientificName: 'Hydrating Facial Cleanser',
        barcode: '3337875597180',
        description: 'Cleanses, hydrates and helps restore the protective skin barrier.',
        image: 'https://m.media-amazon.com/images/I/51j11L-O5eL._SX400_SY400_.jpg',
        purchasingPrice: 300,
        sellingPrice: 400,
        stockQuantity: 40,
        expiryDate: new Date('2027-01-01'),
        isAvailableOnline: true
      },
      {
        name: 'Isis Pharma Neotone Serum - ايزيس فارما نيوتون سيروم',
        scientificName: 'Intensive Intensive Serum',
        barcode: '3401398254425',
        description: 'Intensive serum for dark spots.',
        image: 'https://m.media-amazon.com/images/I/41-9O9D+-TL._SX400_SY400_.jpg',
        purchasingPrice: 550,
        sellingPrice: 680,
        stockQuantity: 25,
        expiryDate: new Date('2026-08-20'),
        isAvailableOnline: true
      }
    ];

    const insertedProducts = [];
    let totalPurchaseAmount = 0;

    // 4. Create or update products
    for (const p of productsData) {
      let prod = await prisma.product.findUnique({ where: { barcode: p.barcode } });
      if (prod) {
        prod = await prisma.product.update({
          where: { barcode: p.barcode },
          data: {
            name: p.name,
            image: p.image,
            purchasingPrice: p.purchasingPrice,
            sellingPrice: p.sellingPrice,
            stockQuantity: p.stockQuantity,
            isAvailableOnline: true
          }
        });
      } else {
        prod = await prisma.product.create({ data: p });
      }
      insertedProducts.push(prod);
      totalPurchaseAmount += (p.purchasingPrice * p.stockQuantity);
    }

    // 5. Create a Purchase Invoice
    const invoiceNumber = 'INV-' + Date.now();
    
    const purchase = await prisma.purchase.create({
      data: {
        invoiceNumber,
        supplierId: supplier.id,
        pharmacistId: pharmacist.id,
        totalAmount: totalPurchaseAmount,
        paidAmount: totalPurchaseAmount,
        status: 'paid',
        items: {
          create: insertedProducts.map(p => ({
            productId: p.id,
            quantity: p.stockQuantity,
            purchasePrice: p.purchasingPrice
          }))
        }
      }
    });

    console.log('Successfully added products and created purchase invoice:', purchase.invoiceNumber);

  } catch (error) {
    console.error('Error seeding cosmetics:', error);
  }
}

main();
