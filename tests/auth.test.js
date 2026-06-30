const request = require('supertest');
const app = require('../src/app');
const prismaMock = require('./prismaMock');
const bcrypt = require('bcryptjs');

describe('Auth Endpoints', () => {
    describe('POST /api/auth/login', () => {
        it('should login successfully with correct credentials', async () => {
            const hashedPassword = await bcrypt.hash('password123', 10);
            const mockUser = {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                password: hashedPassword,
                role: 'pharmacist',
                isActive: true
            };

            prismaMock.user.findUnique.mockResolvedValue(mockUser);

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.user.email).toBe('test@example.com');
            expect(res.headers['set-cookie']).toBeDefined();
        });

        it('should fail with incorrect password', async () => {
            const hashedPassword = await bcrypt.hash('password123', 10);
            const mockUser = {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                password: hashedPassword,
                role: 'pharmacist',
                isActive: true
            };

            prismaMock.user.findUnique.mockResolvedValue(mockUser);

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toBe('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        });

        it('should fail if user is inactive', async () => {
            const hashedPassword = await bcrypt.hash('password123', 10);
            const mockUser = {
                id: 1,
                email: 'inactive@example.com',
                password: hashedPassword,
                isActive: false
            };

            prismaMock.user.findUnique.mockResolvedValue(mockUser);

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'inactive@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toEqual(403);
            expect(res.body.message).toBe('الحساب معطل. تواصل مع الإدارة');
        });
    });
});
