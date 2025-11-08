# OSS Projects

A monorepo of developer utility packages for Node.js, designed for maximum productivity and AI-assisted development.

## Overview

This repository contains 9 independent npm packages that streamline JavaScript and Node.js development workflows. From git operations to dependency management, these tools solve common development challenges.

**Key Features:**
- 🚀 Lerna + Yarn workspaces monorepo
- 🤖 AI-assisted development ready (Claude Code)
- ✅ 80% test coverage minimum
- 📦 Independent package versioning
- 🔄 Automated CI/CD with GitHub Actions
- 📝 Conventional commits workflow

## Packages

### CSS Utilities
- **[convert-css](packages/convert-css)** - Parse and convert CSS to JSON or JavaScript modules

### Git Utilities
- **[node-git-utils](packages/node-git-utils)** - Git operations as JavaScript functions
- **[safe-add-commit-changes](packages/safe-add-commit-changes)** - Safely add and commit changes for automation

### Monorepo Utilities
- **[lerna-utils](packages/lerna-utils)** - Utility functions for leveraging Lerna
- **[workspaces-utils](packages/workspaces-utils)** - Utility functions for working with Yarn workspaces
- **[get-all-dependencies](packages/get-all-dependencies)** - Get all upstream/downstream dependencies in a monorepo

### Development Tools
- **[gen-changelogs](packages/gen-changelogs)** - Generate and update changelogs from conventional commits
- **[npm-link-extra](packages/npm-link-extra)** - Enhanced module linking with `nlx` CLI
- **[tag-dir-with-version](packages/tag-dir-with-version)** - Update placeholders with package name & version

## Quick Start

### Prerequisites

- Node.js 20.19+ (see `.nvmrc`)
- Yarn 4.9.1+

### Installation

```bash
# Clone the repository
git clone https://github.com/DavideDaniel/oss-projects.git
cd oss-projects

# Install dependencies
yarn install

# Install git hooks (optional but recommended)
yarn husky:install

# Verify setup
yarn test:all && yarn lint:all
```

## AI-Assisted Development

This monorepo is optimized for AI pair programming with Claude Code:

### Features

- 🎯 **Custom Slash Commands**: `/new-package`, `/test-package`, `/validate-pr`, etc.
- 🔄 **Session Start Hook**: Auto-initializes environment
- 📋 **Project Context**: AI understands the architecture
- 🤖 **Automated Workflows**: PR summaries, coverage reports
- 📝 **Issue Templates**: Bug reports, features, improvements
- ✅ **Green PR Enforcement**: All PRs must pass CI before review

### Getting Started with AI

1. Open in Claude Code
2. Session hook runs automatically
3. Use slash commands: `/new-package`, `/test-package`, `/validate-pr`
4. **Always run `/validate-pr` before creating PRs**
5. See [AI_SETUP.md](AI_SETUP.md) for full guide

## Development

### Common Commands

```bash
# Testing
yarn test              # Test changed packages
yarn test:all          # Test all packages

# Linting
yarn lint              # Lint changed packages (auto-fix)
yarn lint:all          # Lint all packages

# Documentation
yarn update:docs       # Generate JSDoc for changed packages

# Versioning
yarn bump:prerelease   # Bump versions using conventional commits
```

### Creating a New Package

**Option 1: AI-assisted (recommended)**
```bash
/new-package           # Use Claude Code slash command
```

**Option 2: Manual**
```bash
# Copy template
cp -r .templates/package-template packages/my-package
cd packages/my-package

# Customize files (replace {{PACKAGE_NAME}}, etc.)
# Install dependencies
yarn install
```

### Testing

All packages must maintain **80% test coverage** minimum:

```bash
# Test specific package
lerna run test --scope=package-name

# Run tests with coverage
yarn test:all --coverage

# Watch mode while developing
lerna run test --scope=package-name -- --watch
```

### Pre-commit Hooks

Husky runs automatically before commits:
1. ✅ ESLint auto-fix
2. ✅ Tests for affected packages
3. ✅ Quality gates

## Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Comprehensive architecture guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[AI_SETUP.md](AI_SETUP.md)** - AI-assisted development setup

## CI/CD

GitHub Actions workflows:
- ✅ **Build/Test/Deploy**: Runs on all PRs and pushes
- ✅ **Dependabot**: Weekly dependency updates
- 🤖 **AI PR Summary**: Auto-generates PR summaries
- 📊 **Coverage Report**: Comments coverage stats on PRs

## Publishing

Packages are published to npm independently:

```bash
# Version bump (analyzes conventional commits)
yarn bump:prerelease

# Publish to npm
lerna publish from-git

# Push tags
git push --tags
```

Publishing is automated via GitHub Actions on release branches.

## Versioning

This monorepo uses **independent versioning**:
- Each package has its own version number
- Follows [Semantic Versioning](https://semver.org/)
- Uses [Conventional Commits](https://www.conventionalcommits.org/)

## Technology Stack

- **Monorepo**: Lerna 4.0.0 + Yarn 4 workspaces
- **Package Manager**: Yarn 4.9.1 with Plug'n'Play
- **Testing**: Jest 29
- **Linting**: ESLint 8 + Prettier
- **CI/CD**: GitHub Actions
- **Node.js**: 20.19

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code quality requirements
- Development workflow
- Testing guidelines
- Commit message format
- Pull request process

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes (tests + code)
4. Ensure tests pass: `yarn test:all`
5. Ensure linting passes: `yarn lint:all`
6. Commit with conventional commits: `git commit -m "feat: add feature"`
7. Push and create a PR

## License

MIT © [David Daniel](https://github.com/DavideDaniel)

## Support

- **Issues**: [GitHub Issues](https://github.com/DavideDaniel/oss-projects/issues)
- **Discussions**: [GitHub Discussions](https://github.com/DavideDaniel/oss-projects/discussions)

---

**Built with ❤️ and 🤖 AI assistance**
