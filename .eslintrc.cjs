module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['unused-imports', 'simple-import-sort'],
  parserOptions: {
    extraFileExtensions: ['.svelte'], // This is a required setting in `@typescript-eslint/parser` v4.24.0.
  },
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages. `svelte` related packages come first
          ['^svelte', '^@?\\w'],
          // Internal packages
          ['^(@ue|[A-z]*)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^.+\\.s?css$'],
        ],
      },
    ],
    'sort-imports': 'off',
    'import/order': 'off',
  },
};
