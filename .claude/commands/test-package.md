---
description: Run tests for a specific package or all packages with detailed output
---

Help the user run tests in the monorepo. Follow these steps:

1. Ask which package to test (or "all" for all packages)

2. If testing a specific package:
   - Run: `lerna run test --scope=<package-name> -- --verbose`
   - Show coverage report
   - Highlight any failures or coverage gaps

3. If testing all packages:
   - Run: `yarn test:all` or `lerna run test --stream`
   - Show summary of results for each package
   - Highlight any failures

4. After tests complete:
   - Parse the output and summarize:
     - Total tests: pass/fail counts
     - Coverage percentages (branches, functions, lines, statements)
     - Any tests below 80% coverage threshold
     - Specific test failures with file locations

5. If there are failures:
   - Ask if the user wants to investigate and fix them
   - Offer to show the relevant test file
   - Suggest potential fixes based on error messages

6. If coverage is below threshold:
   - Identify which files need more test coverage
   - Offer to help write additional tests

Pro tip: You can also run `yarn test` to only test packages that have changed since the last commit.
