/* eslint-env node */
module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    node: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['plugin:@typescript-eslint/strict-type-checked'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint'],
    },
  ],
  ignorePatterns: ['!.github/', '!.lintstagedrc.mjs', 'apps/*/dist/'],
};
