import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import dts from 'vite-plugin-dts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'gwm',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'gwm.es.js';
        if (format === 'umd') return 'gwm.umd.js';
        return `gwm.${format}.js`;
      },
    },
    sourcemap: true,
    outDir: 'dist',
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    dts({
      entryRoot: resolve(__dirname, 'src'),
      outDir: resolve(__dirname, 'dist/types'),
    }),
  ],
});