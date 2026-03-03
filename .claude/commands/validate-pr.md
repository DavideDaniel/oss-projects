---
description: Validate that changes are ready for PR submission
---

Run comprehensive validation checks before creating or updating a PR. This command ensures all changes will pass CI checks.

**CRITICAL**: Never create a PR that isn't green. Always validate first.

## Validation Checklist

1. **Check for package.json changes:**
   - If `package.json` was modified, run `yarn install` to update lockfiles
   - Verify `.yarn/cache/`, `yarn.lock`, and `.pnp.cjs` are updated
   - Stage and commit lockfile changes

2. **Run full test suite:**
   ```bash
   yarn test:all
   ```
   - All tests must pass (no failures)
   - All packages must meet 80% coverage threshold
   - Check for any warnings or deprecations

3. **Run full linting:**
   ```bash
   yarn lint:all
   ```
   - No ESLint errors or warnings allowed
   - All files properly formatted with Prettier
   - No import ordering issues

4. **Verify git status:**
   ```bash
   git status
   ```
   - No uncommitted changes
   - All files properly staged and committed
   - Working directory clean

5. **Check CI requirements:**
   - Conventional commit message format
   - All new files added to git
   - No debug code (console.log, etc.) left behind

6. **Push and verify:**
   ```bash
   git push -u origin <branch-name>
   ```
   - Wait for GitHub Actions to run
   - Verify ALL checks are green ✅
   - Check for any failing workflows

## Output Format

Show a checklist with status:
```
🔍 Pre-PR Validation Results

✅ Lockfiles up-to-date
✅ All tests passing (45/45)
✅ Linting clean (no errors)
✅ Git status clean
✅ Commits follow conventions
✅ Ready to create PR

🎯 All validation checks passed! Safe to create PR.
```

If any check fails:
```
❌ Pre-PR Validation Failed

✅ Lockfiles up-to-date
❌ Tests failing (2 failures)
   - packages/foo/__tests__/bar.test.js
   - packages/baz/__tests__/qux.test.js
✅ Linting clean
⚠️  Git has uncommitted changes
   - Modified: packages/foo/index.js

🛑 Fix issues above before creating PR
```

## When to Use

- Before creating a new PR
- Before pushing new commits to existing PR
- After making any code changes
- When CI checks are failing
- As final validation step

## Best Practice

Add this as the LAST step before creating a PR:
1. Make all your changes
2. Commit everything
3. Run `/validate-pr`
4. Fix any issues found
5. Run `/validate-pr` again
6. Only when green, push and create PR

This ensures 100% green PRs for review.
