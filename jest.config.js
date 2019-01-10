module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    diagnostics: false,
    'ts-jest': {
      tsConfig: './tsconfig.json'
    }
  }
};
