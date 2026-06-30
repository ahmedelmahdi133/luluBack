module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  setupFilesAfterEnv: ['./tests/setup.js'],
  testMatch: ['**/tests/**/*.test.js'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  // Mocking Prisma so we don't hit the real database
  moduleNameMapper: {
    '^../config/db$': '<rootDir>/tests/prismaMock.js'
  }
};
