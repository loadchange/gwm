import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'gwm',
      formats: ['es', 'umd'],
      fileName: (format) => `gwm.${format}.js`
    },
    sourcemap: true,
    target: 'es2020'
  },
  plugins: [
    dts({
      outDir: 'dist/types'
    })
  ]
});