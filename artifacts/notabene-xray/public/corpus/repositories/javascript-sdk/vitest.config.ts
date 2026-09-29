import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['node_modules/**/*', 'dist/**/*', 'public/**/*', 'ts-out/**/*'],
    environment: 'jsdom',
    globals: true,
    passWithNoTests: true,
  },
});
