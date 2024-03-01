module.exports = {
  root: true,
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
