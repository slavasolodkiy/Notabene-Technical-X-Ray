import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/notabene.ts'),
      name: 'Notabene',
      formats: ['es', 'cjs'],
      fileName: (format) => `notabene.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          exports: 'named',
          dir: 'dist/esm',
        },
        {
          format: 'cjs',
          exports: 'named',
          dir: 'dist/cjs',
        },
        {
          format: 'es',
          exports: 'named',
          dir: 'dist',
          entryFileNames: 'notabene.js',
        },
      ],
    },
  },
});
