const prisma = require('../config/db');

// @desc    إنشاء فاتورة شراء من مورد (وإضافة الكميات للمخزون)
const createPurchase = async (req, res) => {
    try {
        const { invoiceNumber, companyInvoiceNumber, supplierId, items, paidAmount, taxValue, discountValue } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'الفاتورة لا تحتوي على أدوية' });
        }

        const parsedItems = items.map(i => ({
            ...i,
            quantity: parseInt(i.quantity, 10),
            purchasePrice: parseFloat(i.purchasePrice)
        }));

        let totalAmount = 0;

        // 1. حساب الإجمالي
        parsedItems.forEach(item => {
            totalAmount += (item.purchasePrice * item.quantity);
        });

        const tax = Number(taxValue) || 0;
        const discount = Number(discountValue) || 0;
        totalAmount = totalAmount + tax - discount;

        const paid = Number(paidAmount) || 0;
        const remainingAmount = totalAmount - paid;
        
        // تحديد حالة الدفع
        let status = 'paid';
        if (remainingAmount > 0 && paid > 0) status = 'partial';
        if (paid === 0) status = 'unpaid';

        // 2. إنشاء فاتورة الشراء وعناصرها (Nested Write)
        const purchase = await prisma.purchase.create({
            data: {
                invoiceNumber: invoiceNumber || 'PUR-' + Date.now(),
                companyInvoiceNumber: companyInvoiceNumber || null,
                supplierId,
                pharmacistId: req.user.id,
                totalAmount,
                paidAmount: paid,
                remainingAmount,
                taxValue: tax,
                discountValue: discount,
                status,
                items: {
                    create: parsedItems.map(i => ({
                        productId: i.productId,
                        quantity: i.quantity,
                        purchasePrice: i.purchasePrice
                    }))
                }
            }
        });

        // 3. زيادة المخزون وتحديث سعر الشراء الجديد والصورة (إن وجدت) لكل دواء
        for (const item of parsedItems) {
            let productUpdateData = {
                stockQuantity: { increment: item.quantity },
                purchasingPrice: item.purchasePrice
            };
            if (item.image) {
                productUpdateData.image = item.image;
            }
            if (item.expiryDate) {
                productUpdateData.expiryDate = new Date(item.expiryDate);
            }
            
            await prisma.product.update({
                where: { id: item.productId },
                data: productUpdateData
            });
        }

        // 4. تحديث مديونية الصيدلية للمورد
        if (remainingAmount > 0) {
            await prisma.supplier.update({
                where: { id: supplierId },
                data: { dues: { increment: remainingAmount } }
            });
        }

        res.status(201).json({ success: true, data: purchase });

    } catch (error) {
        // P2002: تكرار الحقول الفريدة (مثل invoiceNumber)
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'رقم فاتورة الشراء مسجل مسبقاً' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    إضافة مورد جديد
const addSupplier = async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.dues !== undefined && data.dues !== '') {
            data.dues = parseFloat(data.dues) || 0;
        }
        const supplier = await prisma.supplier.create({ data });
        res.status(201).json({ success: true, data: supplier });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    جلب كل الموردين
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await prisma.supplier.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json({ success: true, data: suppliers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPurchase, addSupplier, getSuppliers };