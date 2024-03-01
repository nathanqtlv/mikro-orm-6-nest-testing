const { compilerOptions } = require('./tsconfig.json');

function fromTsPath(paths) {
  const pairs = Object.entries(paths).map(([k, [v]]) => [
    `^${k.replace(/\*/, '(.*)')}`,
    `<rootDir>/${v.replace(/\*/, '$1')}`,
  ]);

  return pairs.reduce((res, [key, value]) => ({ ...res, [key]: value }), {});
}

module.exports = {
  coverageDirectory: 'coverage',
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: fromTsPath(compilerOptions.paths),
  modulePaths: ['.'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testTimeout: 20000,
  testRegex: '.*\\.test\\.ts$',
  setupFilesAfterEnv: ['<rootDir>/test/jest/setup.ts'],
};
