module.exports = {
  testURL: 'http://localhost/',
  cache: true,
  clearMocks: true,
  verbose: true,
  coverageDirectory: 'reports/coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  collectCoverage: true,
  coverageReporters: ['json-summary', 'lcov', 'text'],
  testResultsProcessor: 'jest-junit',
  collectCoverageFrom: ['packages/**/**/*.{js}', '!**/node_modules/**'],
  roots: ['packages/'],
  testEnvironment: 'node',
};
