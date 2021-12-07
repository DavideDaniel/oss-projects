#!/usr/bin/env node
import safeAddCommitChanges from './safe-add-commit-changes.mjs';

const globOrPath = process.argv[2];

safeAddCommitChanges(globOrPath);
