---
description: Analyze package dependencies and their relationships in the monorepo
---

Analyze dependencies in the monorepo to help identify optimization opportunities:

1. **Run dependency analysis:**
   - Use the `get-all-dependencies` package if available
   - Or run: `lerna list --graph --all`
   - Identify all internal package dependencies

2. **Check for issues:**
   - Duplicate dependencies across packages
   - Outdated dependencies (use `yarn outdated` per package)
   - Circular dependencies
   - Unused dependencies

3. **Visualize structure:**
   - Create a text-based dependency graph showing:
     - Which packages depend on which
     - External vs internal dependencies
     - Version mismatches of the same dependency

4. **Provide recommendations:**
   - Suggest hoisting common dependencies
   - Identify candidates for shared utilities
   - Flag security vulnerabilities (if any)
   - Recommend packages to upgrade

5. **Optimization suggestions:**
   - Bundle size impacts
   - Potential for tree-shaking
   - Dependencies that could be dev-only
   - Opportunities to reduce package count

Display the analysis in a clear, structured format with actionable insights.
