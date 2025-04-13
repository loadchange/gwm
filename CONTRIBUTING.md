# 贡献指南

感谢您考虑为gwm.js项目做出贡献！以下是一些指导原则，帮助您更有效地参与项目。

## 开发流程

1. Fork 项目仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个Pull Request

## 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范来标准化提交消息。每个提交消息应该由以下部分组成：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### 类型

- **feat**: 新功能
- **fix**: 修复bug
- **docs**: 文档更改
- **style**: 不影响代码含义的更改（空格、格式化、缺少分号等）
- **refactor**: 既不修复bug也不添加功能的代码更改
- **perf**: 提高性能的代码更改
- **test**: 添加缺失的测试或修正现有的测试
- **chore**: 对构建过程或辅助工具和库的更改

### 范围

范围是可选的，可以是任何指定提交更改位置的内容。

### 主题

主题是对更改的简短描述：

- 使用祈使句，现在时："change"而不是"changed"或"changes"
- 不要大写第一个字母
- 结尾不加句号（.）

## 代码风格

- 我们使用ESLint和Prettier来保持代码风格一致
- 在提交代码前，请确保运行`npm run lint`和`npm run test`，确保代码符合规范并通过所有测试

## 测试

- 为所有新功能和修复添加测试
- 确保所有测试都能通过
- 保持测试覆盖率在高水平

## 文档

- 更新README.md以反映任何更改
- 为新功能添加JSDoc注释
- 保持API文档的最新状态

## Pull Request流程

1. 确保您的PR包含一个清晰的描述，说明您的更改解决了什么问题
2. 确保所有自动化测试都通过
3. 确保您的代码遵循项目的代码风格
4. 您的PR将由维护者审查，可能会要求进行更改
5. 一旦您的PR被批准，它将被合并到主分支

## 许可证

通过贡献您的代码，您同意您的贡献将根据项目的MIT许可证进行许可。
We're really glad you're reading this, because we need volunteer developers to help this project come to fruition. 👏

## Instructions

These steps will guide you through contributing to this project:

- Fork the repo
- Clone it and install dependencies

		git clone https://github.com/YOUR-USERNAME/gwm
		npm install

Make and commit your changes. Make sure the command npm run build and npm run test:prod are working. The build system now uses Vite, and type declarations are generated automatically.

Finally send a [GitHub Pull Request](https://github.com/loadchange/gwm/compare?expand=1) with a clear list of what you've done (read more [about pull requests](https://help.github.com/articles/about-pull-requests/)). Make sure all of your commits are atomic (one feature per commit).
