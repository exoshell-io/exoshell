/* eslint-env node */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'turbo'],
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
        project: true,
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint'],
    },
  ],
  ignorePatterns: ['!.lintstagedrc.mjs', '!.github/', 'apps/*/dist/'],
};
