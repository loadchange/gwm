import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript';
import tslint from 'rollup-plugin-tslint';
import { uglify } from 'rollup-plugin-uglify';

const PRODUCTION = process.env.NODE_ENV === 'production';
const extensions = ['.ts', '.d.ts', '.js'];
export default {
  input: 'lib/index.ts',
  output: {
    name: 'gwm',
    file: 'dist/gwm.js',
    format: 'umd',
    sourcemap: false,
  },
  plugins: [
    resolve({ extensions }),
    commonjs(),
    tslint({}),
    typescript({}),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { modules: false }], '@babel/preset-typescript'],
      runtimeHelpers: true,
      extensions,
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    PRODUCTION && uglify(),
  ],
};
