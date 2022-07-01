module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDorectory: 'coverage',
  testEnviroment: 'node',
  transform: {
    '.+\\ts$': 'ts-jest'
  }
}
