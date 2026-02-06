module.exports = {
  testEnvironment: 'node',
  verbose: true,
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js', // Exclude entry point
    '!src/config/**', // Exclude config
  ],
};
