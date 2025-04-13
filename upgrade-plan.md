# 项目构建方案从 Rollup 迁移到 Vite

**目标:** 完全移除 Rollup，使用 Vite 进行库的构建和开发服务器。

**1. 依赖项管理 (`package.json`)**

*   **移除 Rollup 依赖:**
    *   `@rollup/plugin-commonjs`
    *   `@rollup/plugin-json`
    *   `@rollup/plugin-node-resolve`
    *   `@rollup/plugin-replace` (如果存在)
    *   `@rollup/plugin-terser`
    *   `rollup`
    *   `rollup-plugin-dts`
    *   `rollup-plugin-sourcemaps`
    *   `rollup-plugin-typescript2`
    *   `lodash.camelcase` (如果仅 Rollup 使用)
*   **添加 Vite 插件:**
    *   安装 `vite-plugin-dts`: `npm install -D vite-plugin-dts`

**2. Vite 配置 (`vite.config.ts`)**

*   **引入插件:** `import dts from 'vite-plugin-dts'`
*   **更新 `defineConfig`:**
    ```typescript
    import { defineConfig } from 'vite';
    import { resolve } from 'path';
    import dts from 'vite-plugin-dts';

    export default defineConfig({
      // server 配置保持不变，用于开发
      server: {
        port: 3000,
        open: true,
      },
      build: {
        // 库模式配置
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'gwm', // UMD 全局变量名
          formats: ['es', 'umd'], // 输出 ES 和 UMD 格式
          fileName: (format) => {
            if (format === 'es') return 'gwm.es.js'; // 明确 ES 文件名
            if (format === 'umd') return 'gwm.umd.js'; // 明确 UMD 文件名
            return `gwm.${format}.js`; // 其他格式（如果有）
          },
        },
        sourcemap: true, // 保持 Source Map
        outDir: 'dist', // 输出目录
        target: 'es2020', // 确保编译目标与 tsconfig 一致
      },
      // 保留路径别名配置
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
        },
      },
      plugins: [
        // 添加 dts 插件生成类型声明文件
        dts({
          entryRoot: resolve(__dirname, 'src'),
          outDir: resolve(__dirname, 'dist/types'),
          fileName: 'gwm.d.ts',
        })
      ],
    });
    ```

**3. TypeScript 配置 (`tsconfig.json`)**

*   **修改 `compilerOptions`:**
    *   移除 `"declaration": true,` (或设为 `false`)
    *   移除 `"declarationDir": "dist/types",`
    *   移除 `"outDir": "dist/lib",`
    *   确认 `"target": "es2020",`

**4. `package.json` 更新**

*   **更新字段:**
    *   `"main": "dist/gwm.umd.js"` (保持不变)
    *   `"module": "dist/gwm.es.js"` (更新文件名以匹配 Vite 输出)
    *   `"typings": "dist/types/gwm.d.ts"` (更新路径和文件名以匹配 `vite-plugin-dts` 输出)
    *   `"files": ["dist"]` (保持不变)
*   **更新 `scripts`:**
    *   移除 `"prebuild": "rimraf dist",`
    *   修改 `"build": "vite build",`
    *   移除 `"build:prod"` 脚本 (或使其与 `build` 相同)
    *   保持 `"dev": "vite",` 和 `"start": "vite",`

**5. CI/CD 和其他脚本检查**

*   **`.github/workflows/ci.yml`:** 查找构建步骤 (可能使用 `npm run build:prod` 或 `npm run build`)，统一修改为 `npm run build`。
*   **`tools/gh-pages-publish.ts`:** 检查此脚本是否依赖特定的构建产物路径或名称，如果需要则更新。
*   **`tools/semantic-release-prepare.ts`:** 同上，检查并更新。

**6. 文档更新**

*   检查 `README.md`, `README-CN.md`, `CONTRIBUTING.md`, `CONTRIBUTING-EN.md` 等文件。
*   更新 "Build" 或 "Development" 相关章节，将 Rollup 命令替换为 Vite 命令 (`npm run build`, `npm run dev`)。

**7. 测试**

*   运行 `npm run build` 确保构建成功，并检查 `dist` 目录的产物是否符合预期 (文件名、格式、类型声明)。
*   运行 `npm run dev` (或 `start`) 启动开发服务器，并打开 `index.html` (或访问 `http://localhost:3000`)，确认演示页面能正常加载和使用库。
*   运行 `npm test` 确保所有测试用例通过。