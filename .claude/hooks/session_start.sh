#!/usr/bin/env bash
# Claude Code Session Start Hook
# This runs automatically when a new Claude Code session starts

set -e

echo "🚀 Initializing AI-assisted development environment..."

# Ensure we're using the correct Node version
if [ -f .nvmrc ]; then
  NODE_VERSION=$(cat .nvmrc)
  CURRENT_NODE=$(node --version | sed 's/v//')
  if [ "$CURRENT_NODE" != "$NODE_VERSION" ]; then
    echo "⚠️  Warning: Expected Node.js $NODE_VERSION but found $CURRENT_NODE"
    echo "   Please run: nvm use"
  else
    echo "✓ Node.js version: $CURRENT_NODE"
  fi
fi

# Check Yarn version
if command -v yarn >/dev/null 2>&1; then
  YARN_VERSION=$(yarn --version)
  echo "✓ Yarn version: $YARN_VERSION"
else
  echo "❌ Yarn not found - please install Yarn"
  exit 1
fi

# Ensure dependencies are installed
if [ ! -d ".yarn/cache" ] && [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  yarn install
else
  echo "✓ Dependencies installed"
fi

# Verify Git is configured
if ! git config user.email >/dev/null 2>&1; then
  echo "⚠️  Warning: Git user.email not configured"
  echo "   Please run: git config user.email 'your@email.com'"
fi

if ! git config user.name >/dev/null 2>&1; then
  echo "⚠️  Warning: Git user.name not configured"
  echo "   Please run: git config user.name 'Your Name'"
fi

# Show current branch and status
BRANCH=$(git branch --show-current)
echo "✓ Current branch: $BRANCH"

# Check for uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
  echo "⚠️  You have uncommitted changes"
fi

# Display available Claude slash commands
if [ -d ".claude/commands" ]; then
  COMMAND_COUNT=$(find .claude/commands -name "*.md" 2>/dev/null | wc -l)
  if [ "$COMMAND_COUNT" -gt 0 ]; then
    echo "✓ Custom slash commands available: $COMMAND_COUNT"
    echo "   Type /help to see available commands"
  fi
fi

# Quick monorepo stats
PACKAGE_COUNT=$(find packages -maxdepth 1 -mindepth 1 -type d 2>/dev/null | wc -l)
echo "✓ Monorepo packages: $PACKAGE_COUNT"

echo ""
echo "🎯 Environment ready! You can now:"
echo "   • Run tests: yarn test"
echo "   • Lint code: yarn lint"
echo "   • See all commands: yarn run"
echo "   • Use custom commands: /new-package, /test-package, /publish-package"
echo ""
