module.exports = {
  root: true,
  extends: [
    '@voodoo.io/eslint-config/back',
    '@voodoo.io/eslint-config/typescript-recommended',
    '@voodoo.io/eslint-config/jest',
  ],
  plugins: ['prettier'],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': ['error'],
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 11,
  },
};
