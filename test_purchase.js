require('dotenv').config();
const prisma = require('./src/config/db');

async function test() {
    try {
        const user = await prisma.user.findFirst();
        const supplier = await prisma.supplier.findFirst();
        const product = await prisma.product.findFirst();
        
        console.log("User:", user.id);
        console.log("Supplier:", supplier.id);
        console.log("Product:", product.id);

        const items = [{
            productId: product.id,
            quantity: 2.5, // testing decimal
            purchasePrice: 15.5
        }];

        const invoiceNumber = 'TEST-' + Date.now();
        const totalAmount = 38.75;
        const paidAmount = 38.75;

        const purchase = await prisma.purchase.create({
            data: {
                invoiceNumber,
                supplierId: supplier.id,
                pharmacistId: user.id,
                totalAmount,
                paidAmount,
                remainingAmount: 0,
                status: 'paid',
                items: {
                    create: items.map(i => ({
                        productId: i.productId,
                        quantity: i.quantity,
                        purchasePrice: i.purchasePrice
                    }))
                }
            }
        });
        console.log("Purchase created successfully:", purchase.id);
    } catch(e) {
        console.error("Error creating purchase:");
        console.error(e.message);
    } finally {
        await prisma.$disconnect();
    }
}
test();
