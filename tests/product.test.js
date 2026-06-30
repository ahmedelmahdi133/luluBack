const request = require('supertest');
const app = require('../src/app');
const prismaMock = require('./prismaMock');
const jwt = require('jsonwebtoken');

describe('Product Endpoints', () => {
    let token;

    beforeAll(() => {
        // Generate a valid mock token
        token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || '1231', { expiresIn: '1h' });
    });

    describe('GET /api/products', () => {
        it('should fetch a list of products', async () => {
            const mockProducts = [
                { id: 1, name: 'Panadol', stockQuantity: 50, sellingPrice: 2.5 },
                { id: 2, name: 'Aspirin', stockQuantity: 20, sellingPrice: 1.5 }
            ];

            // Mock the user verification logic inside the protect middleware
            prismaMock.user.findUnique.mockResolvedValue({ id: 1, role: 'pharmacist', isActive: true });
            
            // Mock product search and count
            prismaMock.product.findMany.mockResolvedValue(mockProducts);
            prismaMock.product.count.mockResolvedValue(2);

            const res = await request(app)
                .get('/api/products')
                .set('Cookie', [`token=${token}`]);

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.length).toBe(2);
            expect(res.body.data[0].name).toBe('Panadol');
        });
    });
});
