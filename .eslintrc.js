module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'operator-assignment': 'off',
    'max-classes-per-file': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
  },
};
