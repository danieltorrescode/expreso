module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-use-before-define': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 'error',
    semi: ['error', 'always'],
  },
  plugins: ['prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaVersion: 6,
  },
};
