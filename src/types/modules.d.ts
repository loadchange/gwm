// 为没有类型定义的模块声明类型

declare module '@rollup/plugin-node-resolve';
declare module '@rollup/plugin-commonjs';
declare module 'rollup-plugin-sourcemaps';
declare module 'lodash.camelcase';
declare module 'rollup-plugin-typescript2';
declare module '@rollup/plugin-json';
declare module '@rollup/plugin-terser';
declare module 'vite';

// Jest类型声明
declare global {
  const describe: (name: string, fn: () => void) => void;
  const it: (name: string, fn: () => void) => void;
  const expect: any;
  const beforeEach: (fn: () => void) => void;
  const afterEach: (fn: () => void) => void;
  const jest: any;
}
declare module 'rollup-plugin-dts';

// 允许导入JSON文件
declare module '*.json' {
  const value: any;
  export default value;
}