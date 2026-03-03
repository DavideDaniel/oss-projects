# OSS Development Tools Monorepo - AI Context

## Project Overview

This is a monorepo containing developer utility packages designed to streamline Node.js and JavaScript development workflows. The project uses Lerna + Yarn workspaces for monorepo management.

## Architecture

- **Monorepo Manager**: Lerna 4.0.0 (independent versioning)
- **Package Manager**: Yarn 4.9.1 with Plug'n'Play (PnP)
- **Node Version**: 20.19 (.nvmrc enforced)
- **Language**: JavaScript (ES2020, no TypeScript)

## Packages (9 total)

1. **convert-css** - CSS parsing and conversion to JSON/JS modules
2. **gen-changelogs** - Changelog generation from conventional commits
3. **get-all-dependencies** - Monorepo dependency tree analysis
4. **lerna-utils** - Lerna API utility functions
5. **node-git-utils** - Git operations as JS functions
6. **npm-link-extra** - Enhanced module linking with `nlx` CLI
7. **safe-add-commit-changes** - Safe automation for git commits
8. **tag-dir-with-version** - Template versioning utilities
9. **workspaces-utils** - Yarn workspace utility functions

## Development Standards

### Code Quality Requirements
- **Test Coverage**: Minimum 80% (branches, functions, lines, statements)
- **Linting**: ESLint with Prettier integration, strict import ordering
- **Formatting**: Prettier (single quotes, trailing commas, 100 char width)
- **Commits**: Conventional commits format required

### CI/CD Pipeline
- Automated testing on all PRs
- Lint and test on push to main
- Automated npm publishing on release branches
- Dependabot weekly updates (patch/minor only)

## Common Commands

### Testing
```bash
yarn test                    # Test changed packages
yarn test:all                # Test all packages
lerna run test --scope=<pkg> # Test specific package
```

### Linting
```bash
yarn lint                    # Lint changed packages with auto-fix
yarn lint:all                # Lint all packages
```

### Documentation
```bash
yarn update:docs             # Generate JSDoc documentation for changed packages
```

### Versioning & Publishing
```bash
yarn bump:prerelease         # Bump versions using conventional commits
lerna publish                # Publish changed packages to npm
```

### Package Management
```bash
lerna add <dep> --scope=<pkg>        # Add dependency to specific package
lerna add <dep>                      # Add dependency to all packages
lerna bootstrap                      # Install all dependencies and link packages
```

## CRITICAL: PR Requirements

**BEFORE creating or pushing ANY PR:**
1. ✅ Run `yarn install` if package.json was modified (updates lockfiles)
2. ✅ Run `yarn test:all` - ALL tests must pass
3. ✅ Run `yarn lint:all` - NO linting errors allowed
4. ✅ Verify all changes are committed
5. ✅ Push changes and wait for CI to be GREEN
6. ✅ Only request review when ALL CI checks pass

**Never create a PR that isn't green. This is non-negotiable.**

## AI Development Guidelines

### When Creating New Packages
1. Follow the existing structure in `/packages/*`
2. Include comprehensive JSDoc comments for auto-documentation
3. Set up Jest tests with 80%+ coverage
4. Add package to root package.json workspaces (if not using glob)
5. Use conventional naming: lowercase-with-hyphens

### When Modifying Existing Code
1. Always run tests before and after changes
2. Update JSDoc comments if function signatures change
3. Follow existing code style (detected by ESLint/Prettier)
4. Add test cases for new functionality
5. Update package README.md if public API changes

### When Adding Dependencies
- Prefer adding to specific packages rather than root
- Check if dependency already exists in another package
- Consider if it should be a shared dependency
- Use exact versions for published packages
- **ALWAYS run `yarn install` after modifying package.json**
- **ALWAYS commit lockfile changes (.yarn/cache/, yarn.lock, .pnp.cjs)**

### Continuous Improvement Priorities
1. Increase test coverage (current: 80% minimum, aim for 90%+)
2. Add TypeScript type definitions (.d.ts files)
3. Improve documentation with examples
4. Create integration tests between packages
5. Optimize CI/CD performance
6. Add automated security scanning
7. Create package dependency visualization
8. Implement automated semantic releases

## File Locations

- Package sources: `/packages/<package-name>/`
- Tests: `packages/<package-name>/__tests__/`
- CI/CD: `.github/workflows/`
- Linting: `.eslintrc.js` (root)
- Testing: `jest.config.js` (root)
- Yarn config: `.yarnrc.yml`

## Important Notes

- **Yarn PnP**: Dependencies are in `.yarn/cache/`, not `node_modules/`
- **ESLint/Prettier**: Use Yarn SDK versions (in `.yarn/sdks/`)
- **Coverage Reports**: Generated in `reports/coverage/`
- **Independent Versioning**: Each package has its own version number
- **Git Tags**: Automatically created on publish (format: `<package>@<version>`)
