import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import autoImports from './.wxt/eslint-auto-imports.mjs';

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  autoImports,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { ignores: ['{eslint,postcss,wxt}.config.*', '.wxt/**/*', '.output/'] },
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['**/*.{j,t}sx'],
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  },
);
