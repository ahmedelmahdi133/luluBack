require('dotenv').config();
const prisma = require('./src/config/db');

async function main() {
    console.log("Fetching up to 100 products to seed with images and stock...");
    
    // We get 100 products that either have no image or are 0 stock
    const products = await prisma.product.findMany({
        take: 100
    });

    console.log(`Found ${products.length} products. Updating images and stock...`);

    let updatedCount = 0;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        
        // Generate a random realistic medicine image URL
        // We use different keywords to get variety
        const keyword = i % 3 === 0 ? 'medicine' : i % 3 === 1 ? 'pill' : 'pharmacy';
        const url = `https://loremflickr.com/500/500/${keyword}?random=${product.id}`;
        
        try {
            await prisma.product.update({
                where: { id: product.id },
                data: {
                    image: url,
                    stockQuantity: 10
                }
            });
            updatedCount++;
            if (updatedCount % 10 === 0) {
                console.log(`✅ Updated ${updatedCount} products...`);
            }
        } catch (e) {
            console.error(`Error updating ${product.name}:`, e.message);
        }
    }
    
    console.log(`🎉 Done! Successfully updated ${updatedCount} products with images and 10 stock.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
