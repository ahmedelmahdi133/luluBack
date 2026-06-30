const request = require('supertest');
const app = require('../src/app');
const prismaMock = require('./prismaMock');
const jwt = require('jsonwebtoken');

describe('Order Endpoints', () => {
    let token;

    beforeAll(() => {
        token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || '1231', { expiresIn: '1h' });
    });

    describe('POST /api/orders', () => {
        it('should create an order successfully and decrement stock', async () => {
            const mockUser = { id: 1, role: 'pharmacist', isActive: true };
            const mockShift = { id: 10, pharmacistId: 1, status: 'open' };
            const mockProduct = { id: 5, name: 'Paracetamol', stockQuantity: 100, sellingPrice: 10 };

            prismaMock.user.findUnique.mockResolvedValue(mockUser);
            prismaMock.shift.findFirst.mockResolvedValue(mockShift);
            
            // In the controller, it finds the product using findMany
            prismaMock.product.findMany.mockResolvedValue([mockProduct]);
            
            const expectedOrder = {
                id: 1,
                orderNumber: 'ORD-1234',
                totalAmount: 20,
                status: 'completed'
            };
            
            prismaMock.order.create.mockResolvedValue(expectedOrder);
            prismaMock.product.update.mockResolvedValue({ ...mockProduct, stockQuantity: 98 });
            // Mock transaction since it's an array of operations
            prismaMock.$transaction.mockResolvedValue([expectedOrder, { ...mockProduct, stockQuantity: 98 }]);

            const res = await request(app)
                .post('/api/orders')
                .set('Cookie', [`token=${token}`])
                .send({
                    orderItems: [{ productId: 5, quantity: 2 }],
                    paymentMethod: 'cash'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toBe(true);
        });

        it('should fail if stock is insufficient', async () => {
            const mockUser = { id: 1, role: 'pharmacist', isActive: true };
            const mockShift = { id: 10, pharmacistId: 1, status: 'open' };
            const mockProduct = { id: 5, name: 'Paracetamol', stockQuantity: 1, sellingPrice: 10 }; // Only 1 in stock

            prismaMock.user.findUnique.mockResolvedValue(mockUser);
            prismaMock.shift.findFirst.mockResolvedValue(mockShift);
            prismaMock.product.findMany.mockResolvedValue([mockProduct]);

            const res = await request(app)
                .post('/api/orders')
                .set('Cookie', [`token=${token}`])
                .send({
                    orderItems: [{ productId: 5, quantity: 2 }], // Trying to buy 2
                    paymentMethod: 'cash'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toMatch(/الكمية المتاحة/);
        });
    });
});
