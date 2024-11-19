// @ts-check

import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(eslint.configs.recommended, {
  ignores: ['.fttemplates/**', '*.mjs'],
});
