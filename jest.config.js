// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/spec/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)', '**/spec/**/*.mjs', '**/?(*.)(spec|test).mjs'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  verbose: true,
  transform: {
    '^.+\\.m?jsx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs']
};
