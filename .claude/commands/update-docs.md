---
description: Generate and update documentation for packages using JSDoc and README files
---

Update documentation across the monorepo:

1. **Generate JSDoc documentation:**
   - Run: `yarn update:docs` for changed packages
   - Or run: `lerna run docs --scope=<package-name>` for specific package
   - Review generated documentation

2. **Update README files:**
   - For each package, ensure README.md includes:
     - Clear description
     - Installation instructions
     - Usage examples with code snippets
     - API reference (or link to generated docs)
     - Contributing guidelines
     - License information

3. **Verify code examples:**
   - Extract code examples from README
   - Verify they actually work
   - Update if outdated or broken

4. **Check JSDoc completeness:**
   - Ensure all public functions have:
     - Description
     - @param tags with types
     - @returns tag with type
     - @throws tag if applicable
     - @example tags where helpful

5. **Update root documentation:**
   - Verify root README lists all packages
   - Update package descriptions if changed
   - Ensure monorepo documentation is current

6. **Generate changelog:**
   - Use `gen-changelogs` package if available
   - Ensure CHANGELOG.md is up-to-date
   - Follow conventional commits format

7. **Review and commit:**
   - Show all documentation changes
   - Ask for review
   - Commit with message: "docs: update documentation"

Make sure documentation is clear, accurate, and helpful for both humans and AI assistants.
