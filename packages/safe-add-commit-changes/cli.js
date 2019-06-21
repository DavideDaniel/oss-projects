#!/usr/bin/env node
const safeAddCommitChanges = require('./safe-add-commit-changes');

const globOrPath = process.argv[2];

safeAddCommitChanges(globOrPath);
