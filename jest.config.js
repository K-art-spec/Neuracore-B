/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: [],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: {
      jsx: 'react-jsx',
    }}],
  },
};


