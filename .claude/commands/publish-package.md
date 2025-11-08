---
description: Guide through the package publishing process with version bumping and changelog generation
---

Guide the user through publishing packages to npm. Follow these steps:

1. **Pre-publish checks:**
   - Ensure git working directory is clean
   - Ensure on correct branch (main or release branch)
   - Run full test suite: `yarn test:all`
   - Run linting: `yarn lint:all`
   - Verify all checks pass

2. **Version selection:**
   - Ask: "What type of version bump? (patch/minor/major/prerelease)"
   - Or offer to analyze commits using conventional commits

3. **Update version and changelog:**
   - Run: `yarn bump:prerelease` (or appropriate lerna version command)
   - Show what versions will change
   - Generate/update changelogs using `yarn update:changelogs` if available

4. **Review changes:**
   - Show git diff of changed files
   - Display updated versions for each package
   - Ask for confirmation to proceed

5. **Publish:**
   - Run: `lerna publish from-git` or `lerna publish`
   - Monitor output for any errors
   - Verify successful publish to npm

6. **Post-publish:**
   - Confirm git tags were created
   - Verify packages appear on npm
   - Show npm package URLs
   - Remind to push tags: `git push --tags`

7. **Rollback (if needed):**
   - If publish fails, offer to help rollback:
     - Reset git tags
     - Reset version numbers
     - Investigate and fix the issue

Important: Ensure NPM_TOKEN is configured if publishing via CI/CD.
