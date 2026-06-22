const prisma = require('../config/db');
const path = require('path');

const submitPrescription = async (req, res) => {
    try {
        const { imageUrl, notes } = req.body;

        if (!imageUrl || !imageUrl.trim()) {
            return res.status(400).json({ message: 'Prescription image URL is required' });
        }

        const prescription = await prisma.prescription.create({
            data: {
                prescriptionNumber: 'RX-' + Date.now(),
                customerId: req.user.id,
                imageUrl: imageUrl.trim(),
                notes: notes?.trim(),
                status: 'pending'
            }
        });

        res.status(201).json({ success: true, data: prescription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyPrescriptions = async (req, res) => {
    try {
        const prescriptions = await prisma.prescription.findMany({
            where: { customerId: req.user.id },
            include: {
                pharmacist: { select: { name: true } },
                items: true // جلب الأدوية المرتبطة بالروشتة
            },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({ success: true, data: prescriptions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const respondToQuote = async (req, res) => {
    try {
        const { response } = req.body;
        if (!['accepted', 'rejected'].includes(response)) {
            return res.status(400).json({ message: 'Response must be accepted or rejected' });
        }

        const prescription = await prisma.prescription.findFirst({
            where: {
                id: req.params.id,
                customerId: req.user.id,
                status: 'quoted'
            }
        });

        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found or not in quoted status' });
        }

        const updatedPrescription = await prisma.prescription.update({
            where: { id: prescription.id },
            data: {
                customerResponse: response,
                status: response === 'accepted' ? 'preparing' : 'rejected'
            }
        });

        res.status(200).json({ success: true, data: updatedPrescription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllPrescriptions = async (req, res) => {
    try {
        const { status } = req.query;
        let whereClause = {};
        if (status) whereClause.status = status;

        const prescriptions = await prisma.prescription.findMany({
            where: whereClause,
            include: {
                customer: { select: { name: true, email: true, phone: true } },
                pharmacist: { select: { name: true } },
                items: true
            },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({ success: true, count: prescriptions.length, data: prescriptions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const reviewPrescription = async (req, res) => {
    try {
        const { status, pharmacistNotes, quotedPrice, items, rejectionReason } = req.body;

        const prescription = await prisma.prescription.findUnique({
            where: { id: req.params.id }
        });

        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        // تجهيز بيانات التحديث
        let updateData = {
            pharmacistId: req.user.id
        };

        if (status) updateData.status = status;
        if (pharmacistNotes !== undefined) updateData.pharmacistNotes = pharmacistNotes;
        if (quotedPrice !== undefined) updateData.quotedPrice = quotedPrice;
        if (rejectionReason !== undefined) updateData.rejectionReason = rejectionReason;

        // تحديث الأدوية (Items) لو موجودة باستخدام ميزة Prisma Nested Writes
        if (items && Array.isArray(items)) {
            updateData.items = {
                deleteMany: {}, // مسح القديم
                create: items.map(item => ({
                    productName: item.productName,
                    quantity: item.quantity || 1,
                    price: item.price || 0
                })) // إدخال الجديد
            };
        }

        const updatedPrescription = await prisma.prescription.update({
            where: { id: prescription.id },
            data: updateData,
            include: {
                customer: { select: { name: true, email: true, phone: true } },
                pharmacist: { select: { name: true } },
                items: true
            }
        });

        res.status(200).json({ success: true, data: updatedPrescription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const uploadPrescriptionImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const filePath = `/uploads/prescriptions/${req.file.filename}`.replace(/\\/g, '/');
        const imageUrl = `${req.protocol}://${req.get('host')}${filePath}`;

        res.status(201).json({
            success: true,
            data: {
                image: imageUrl,
                filename: req.file.filename,
                mimeType: req.file.mimetype,
                size: req.file.size,
                extension: path.extname(req.file.originalname)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitPrescription, getMyPrescriptions, respondToQuote, getAllPrescriptions, reviewPrescription, uploadPrescriptionImage };