---
description: Identify and improve test coverage for packages below the 80% threshold
---

Help improve test coverage across the monorepo:

1. **Identify coverage gaps:**
   - Run: `yarn test:all --coverage`
   - Parse coverage reports from `reports/coverage/`
   - List packages below 80% coverage threshold
   - Show specific files with low coverage

2. **Analyze each low-coverage file:**
   - Read the source file
   - Read the existing test file
   - Identify uncovered code paths:
     - Uncovered branches (if/else conditions)
     - Uncovered functions
     - Uncovered lines

3. **Generate test cases:**
   - For each uncovered path, create appropriate test cases:
     - Happy path tests
     - Error condition tests
     - Edge case tests
     - Boundary tests
   - Follow existing test patterns in the package
   - Use proper Jest syntax and assertions

4. **Add tests incrementally:**
   - Add tests to existing test files
   - Run tests after each addition
   - Verify coverage increases
   - Ensure all new tests pass

5. **Verify improvements:**
   - Run coverage again
   - Show before/after comparison
   - Confirm 80%+ coverage achieved
   - Check that no existing tests broke

6. **Document test patterns:**
   - If creating new testing patterns, add comments
   - Ensure tests are maintainable and clear

Continue until all packages meet or exceed the 80% coverage threshold.
