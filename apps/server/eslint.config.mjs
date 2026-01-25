import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import typescriptEslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  typescriptEslint.configs.strict,
  typescriptEslint.configs.stylistic
);
