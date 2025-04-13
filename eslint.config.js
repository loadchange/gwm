import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier, // 添加 prettier 配置，确保它覆盖其他规则
  {
    languageOptions: {
      parserOptions: {
        project: true, // 使用 tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // 从旧配置迁移的规则
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Prettier 规则通常由 eslint-config-prettier 处理，无需在此显式添加 'prettier/prettier': 'error'
    },
  },
  {
    // 忽略文件/目录
    ignores: [
      'dist/',
      'node_modules/',
      'coverage/',
      'docs/.vitepress/dist/',
      'docs/.vitepress/cache/',
      '.eslintrc.js', // 明确忽略旧文件
      'eslint.config.js', // 通常忽略配置文件本身
      'vite.config.ts',
      'tools/', // 忽略 tools 目录
      'test/setup.ts', // 忽略测试设置文件
    ],
  }
);