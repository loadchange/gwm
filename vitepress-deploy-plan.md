# 使用 VitePress 部署 GitHub Pages 计划

**目标:** 使用 VitePress 构建的文档站点替换当前的 GitHub Pages 演示站 (`loadchange.github.io/gwm/`)。

**确认状态:**

*   项目已集成 VitePress (`package.json` 依赖和脚本)。
*   `docs` 目录包含 Markdown 源文件和 `.vitepress` 配置目录 (`docs/.vitepress/config.ts`)。
*   存在一个部署脚本 (`tools/gh-pages-publish.ts`)，部署的是源文件。
*   项目使用 GitHub Actions (`.github/workflows/ci.yml`) 进行 CI/CD。
*   项目使用 `pnpm` 作为包管理器。
*   VitePress 配置 (`docs/.vitepress/config.ts`) 缺少 `base` 选项，未指定 `outDir` (默认为 `docs/.vitepress/dist`)。

**计划步骤:**

1.  **更新 VitePress 配置 (`docs/.vitepress/config.ts`):**
    *   添加 `base: '/gwm/',` 配置项。

2.  **修改部署脚本 (`tools/gh-pages-publish.ts`):**
    *   在脚本开头添加构建命令: `exec("pnpm run docs:build")`。
    *   将 `cd("docs")` 修改为 `cd("docs/.vitepress/dist")`。

3.  **更新 GitHub Actions (`.github/workflows/ci.yml`):**
    *   读取 `ci.yml` 内容。
    *   找到部署到 `gh-pages` 的步骤。
    *   修改该步骤，确保使用 `pnpm` 安装依赖，然后执行 `pnpm run docs:build`，最后将 `docs/.vitepress/dist` 目录的内容部署到 `gh-pages` 分支。 (具体实现可能是修改现有脚本调用，或者直接在 workflow 中执行部署命令)。

4.  **本地测试:**
    *   运行 `pnpm run docs:dev`, `pnpm run docs:build`, `pnpm run docs:preview` 进行验证。

5.  **提交更改并触发部署:**
    *   将修改后的 `config.ts`, `gh-pages-publish.ts` (如果修改), 和 `ci.yml` 提交。

6.  **验证:**
    *   检查 GitHub Actions 状态和线上站点 `loadchange.github.io/gwm/`。

7.  **清理 (可选):**
    *   移除根目录下的 `index.html`。

**Mermaid 图示:**

```mermaid
graph TD
    A[开始] --> B(更新 VitePress config.ts 添加 base);
    B --> C(修改部署脚本 gh-pages-publish.ts);
    C --> D(读取并更新 GitHub Actions ci.yml);
    D --> E(本地测试);
    E --> F{测试通过?};
    F -- 是 --> G(提交更改并触发部署);
    F -- 否 --> E;
    G --> H(验证线上站点);
    H --> I{验证成功?};
    I -- 是 --> J(可选: 清理 index.html);
    I -- 否 --> G;
    J --> K[完成];