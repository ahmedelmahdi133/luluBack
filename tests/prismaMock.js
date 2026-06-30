const { mockDeep, mockReset } = require('jest-mock-extended');
const { PrismaClient } = require('@prisma/client');

const prismaMock = mockDeep();

beforeEach(() => {
  mockReset(prismaMock);
  prismaMock.$transaction = jest.fn().mockImplementation((ops) => Promise.all(ops));
});

module.exports = prismaMock;
