# Contributing Guidelines

Thank you for considering contributing to the gwm.js project! Here are some guidelines to help you contribute effectively.

## Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## Commit Convention

We use the [Conventional Commits](https://www.conventionalcommits.org/) specification to standardize our commit messages. Each commit message should be structured as follows:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

The build system uses Vite, and type declarations are generated automatically.

### Scope

The scope is optional and can be anything specifying the place of the commit change.

### Subject

The subject is a short description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end

## Code Style

- We use ESLint and Prettier to maintain consistent code style
- Before submitting your code, please make sure to run `npm run lint` and `npm run test` to ensure your code adheres to our standards and passes all tests

## Testing

- Add tests for all new features and fixes
- Ensure all tests pass
- Maintain high test coverage

## Documentation

- Update the README.md to reflect any changes
- Add JSDoc comments for new features
- Keep the API documentation up to date

## Pull Request Process

1. Ensure your PR includes a clear description of what problem your changes solve
2. Ensure all automated tests pass
3. Ensure your code follows the project's code style
4. Your PR will be reviewed by maintainers, and changes may be requested
5. Once your PR is approved, it will be merged into the main branch

## License

By contributing your code, you agree to license your contribution under the project's MIT license.