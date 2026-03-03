---
description: Create a new package in the monorepo with proper structure and boilerplate
---

Create a new package in this monorepo. Follow these steps:

1. Ask the user for the package name (kebab-case format)
2. Ask for a brief description of what the package does
3. Create the package directory structure:
   ```
   packages/<package-name>/
   ├── package.json
   ├── README.md
   ├── index.js
   ├── lib/
   └── __tests__/
       └── index.test.js
   ```

4. Generate package.json with:
   - Proper name (@scope or standalone)
   - Version 0.1.0
   - Description from user input
   - Main entry point: "index.js"
   - Scripts: test, lint, docs
   - Dependencies: only what's needed
   - License: MIT (or project default)
   - Repository information from root package.json

5. Create a comprehensive README.md with:
   - Package name and description
   - Installation instructions
   - Usage examples
   - API documentation section
   - Contributing link
   - License

6. Create index.js with:
   - JSDoc header comments
   - Basic exported function(s)
   - Proper error handling

7. Create initial test file with:
   - Jest test structure
   - Basic test cases
   - 80%+ coverage ready

8. Run `yarn install` to link the new package
9. Run `yarn test --scope=<package-name>` to verify tests pass
10. Show summary of created files and next steps

Ensure all files follow the existing code style and standards in the monorepo.
