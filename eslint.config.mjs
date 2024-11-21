import eslint from '@eslint/js';
import ts from 'typescript-eslint';
import react from '@eslint-react/eslint-plugin';
import reactQuery from '@tanstack/eslint-plugin-query';
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';
import autoImports from './apps/browser/.wxt/eslint-auto-imports.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

/** @typedef {Parameters<typeof ts.config>[0]} InfiniteDepthConfigWithExtends */

export default ts.config(
  eslint.configs.recommended,
  {
    extends: [...ts.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.worker,
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      react.configs['recommended-type-checked'],
      ...reactQuery.configs['flat/recommended'],
      compat.extends('plugin:react-hooks/recommended'),
    ],
    rules: {
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
    },
  },
  { extends: [/** @type {InfiniteDepthConfigWithExtends} */ (autoImports)] },
  { ignores: ['target/**', '**/.*/**', 'apps/desktop/out/**', 'x/**'] },
  { files: ['.github/scripts/**'] },
);
