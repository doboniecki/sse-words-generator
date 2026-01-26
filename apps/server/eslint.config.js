import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import typescriptEslint from 'typescript-eslint';
import { URL, fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';

const gitignorePath = fileURLToPath(
  new URL('.gitignore', import.meta.url)
);

export default defineConfig(
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  eslint.configs.recommended,
  typescriptEslint.configs.strict,
  typescriptEslint.configs.stylistic,
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type']
    }
  }
);
