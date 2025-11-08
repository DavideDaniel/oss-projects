# Contributing to OSS Development Tools

Thank you for your interest in contributing! This guide is optimized for both human and AI-assisted development.

## Quick Start

1. **Fork and clone** the repository
2. **Install dependencies**: `yarn install`
3. **Verify setup**: `yarn test && yarn lint`
4. **Create a branch**: `git checkout -b feature/your-feature-name`
5. **Make your changes** following our standards (see below)
6. **Test thoroughly**: Ensure 80%+ coverage
7. **Submit a PR** with a clear description

## Development Standards

### Code Quality Requirements

All contributions must meet these standards:

- ✅ **Test Coverage**: Minimum 80% for all metrics (branches, functions, lines, statements)
- ✅ **Linting**: Must pass ESLint with no warnings or errors
- ✅ **Formatting**: Prettier formatting enforced (run `yarn lint` to auto-fix)
- ✅ **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/) format
- ✅ **Documentation**: JSDoc comments for all public APIs

### Commit Message Format

We use conventional commits for automated changelog generation and semantic versioning:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `ci`: CI/CD changes

**Examples:**
```
feat(node-git-utils): add support for git worktrees

fix(safe-add-commit-changes): prevent empty commits

docs(README): update installation instructions

test(lerna-utils): increase coverage for getPackages function
```

## Monorepo Structure

This project uses Lerna + Yarn workspaces:

```
.
├── packages/
│   ├── convert-css/
│   ├── gen-changelogs/
│   ├── get-all-dependencies/
│   ├── lerna-utils/
│   ├── node-git-utils/
│   ├── npm-link-extra/
│   ├── safe-add-commit-changes/
│   ├── tag-dir-with-version/
│   └── workspaces-utils/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── .claude/                # AI-assisted development config
├── .yarn/                  # Yarn PnP cache and SDKs
└── reports/                # Test coverage and results
```

## Working with Packages

### Testing a Package

```bash
# Test specific package
lerna run test --scope=<package-name>

# Test all packages
yarn test:all

# Test only changed packages
yarn test

# With coverage
yarn test:all --coverage
```

### Linting

```bash
# Lint specific package
lerna run lint --scope=<package-name>

# Lint all packages with auto-fix
yarn lint

# Lint without fix
lerna run lint --no-bail
```

### Adding Dependencies

```bash
# Add to specific package
lerna add <dependency> --scope=<package-name>

# Add to all packages
lerna add <dependency>

# Add as dev dependency
lerna add -D <dependency> --scope=<package-name>

# Add workspace dependency (internal package)
# Edit package.json manually and run yarn install
```

### Creating a New Package

Use the AI-assisted command: `/new-package`

Or manually:

1. Create directory: `packages/<package-name>/`
2. Create `package.json` with proper structure
3. Create `index.js` with JSDoc comments
4. Create `__tests__/index.test.js`
5. Create `README.md`
6. Run `yarn install` to link it
7. Add tests with 80%+ coverage

**Package Structure:**
```
packages/<package-name>/
├── package.json           # Package metadata and dependencies
├── README.md              # Package documentation
├── index.js               # Main entry point
├── lib/                   # Additional modules (if needed)
│   └── *.js
└── __tests__/             # Jest tests
    ├── index.test.js
    └── *.test.js
```

## Code Style Guide

### JavaScript

- **ES2020 features** are supported
- **No TypeScript** (but JSDoc types encouraged)
- **Single quotes** for strings
- **Trailing commas** in objects/arrays
- **100 character** line width
- **2 spaces** for indentation

### JSDoc Comments

All public functions must have JSDoc:

```javascript
/**
 * Brief description of what the function does
 *
 * @param {string} name - Parameter description
 * @param {Object} options - Options object
 * @param {boolean} [options.verbose=false] - Enable verbose output
 * @returns {Promise<Array>} Description of return value
 * @throws {Error} When invalid input is provided
 *
 * @example
 * const result = await myFunction('test', { verbose: true });
 * console.log(result); // ['item1', 'item2']
 */
async function myFunction(name, options = {}) {
  // implementation
}
```

### Test Structure

```javascript
const { myFunction } = require('../index');

describe('myFunction', () => {
  it('should handle valid input', () => {
    const result = myFunction('valid');
    expect(result).toBe('expected');
  });

  it('should throw on invalid input', () => {
    expect(() => myFunction(null)).toThrow('Invalid input');
  });

  it('should handle edge cases', () => {
    expect(myFunction('')).toBe('');
    expect(myFunction(undefined)).toBe(undefined);
  });
});
```

## Testing Guidelines

### Coverage Requirements

Minimum 80% coverage for:
- **Branches**: All if/else and switch cases
- **Functions**: All declared functions
- **Lines**: Executable code lines
- **Statements**: All statements

### What to Test

✅ **Do test:**
- Happy path scenarios
- Error conditions and edge cases
- Different input types and ranges
- Async operations and promises
- Integration between functions

❌ **Don't test:**
- Third-party library internals
- Simple getters/setters (unless complex logic)
- Code that's just passing through

### Running Tests Locally

```bash
# Run tests in watch mode while developing
lerna run test --scope=<package> -- --watch

# Run with coverage
lerna run test --scope=<package> -- --coverage

# Run specific test file
jest packages/<package>/__tests__/specific.test.js

# Update snapshots
jest --updateSnapshot
```

## AI-Assisted Development

This project is optimized for AI pair programming. Use these features:

### Custom Slash Commands

- `/new-package` - Create a new package with proper structure
- `/test-package` - Run and analyze tests for packages
- `/publish-package` - Guide through publishing workflow
- `/analyze-deps` - Analyze dependencies and identify issues
- `/improve-coverage` - Identify and improve test coverage
- `/update-docs` - Generate and update documentation

### Session Start Hook

The `.claude/hooks/session_start.sh` automatically runs when starting a new AI session to:
- Verify Node.js version
- Check dependency installation
- Show git status
- Display available commands

### Project Context

The `.claude/project_context.md` file provides AI assistants with:
- Architecture overview
- Development standards
- Common commands
- Continuous improvement priorities

## Pull Request Process

1. **Update your branch** with latest main:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run full test suite**:
   ```bash
   yarn test:all
   yarn lint:all
   ```

3. **Update documentation**:
   - Update package README if API changed
   - Add/update JSDoc comments
   - Run `yarn update:docs`

4. **Create descriptive PR**:
   - Title: `<type>(<scope>): <description>`
   - Description: What changed and why
   - Link related issues
   - Include test results if relevant

5. **Respond to reviews**:
   - Address feedback promptly
   - Push new commits (don't force-push during review)
   - Request re-review when ready

6. **After merge**:
   - Delete your branch
   - Pull latest main
   - Celebrate! 🎉

## Publishing Packages

Only maintainers can publish to npm. The process is:

1. **Version bump**: `yarn bump:prerelease` (or `lerna version`)
2. **Generate changelogs**: `yarn update:changelogs`
3. **Review changes**: Check git diff
4. **Publish**: `lerna publish from-git`
5. **Push tags**: `git push --tags`

Publishing is automated via GitHub Actions on release branches.

## CI/CD Pipeline

All PRs trigger automated checks:

1. ✅ Install dependencies
2. ✅ Run ESLint on all packages
3. ✅ Run Jest tests on all packages
4. ✅ Verify 80% coverage threshold
5. ✅ Generate coverage reports

PRs cannot merge unless all checks pass.

## Getting Help

- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: For questions and ideas
- **AI Commands**: Use `/help` for available commands
- **Documentation**: Check package READMEs and JSDoc

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Prioritize project health

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making development tools better for everyone! 🚀
