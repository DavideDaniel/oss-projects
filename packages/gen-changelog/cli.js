#!/usr/bin/env node

const { execSync } = require('child_process');

const { argv } = require('yargs')
  .usage('Usage: $0 [-p preset]')
  .example('$0 -p angular', 'start conventional-bump with angular preset')
  .describe('version', 'Print current version')
  .help('h')
  .alias('h', 'help')
  .alias('l', 'location')
  .nargs('p', 1)
  .default('p', 'angular')
  .describe('p', 'conventional-changelog preset to use');

const {
  getContentOnly,
  readChangelog,
  updateChangelog,
} = require('./index');

const opts = {
  location: argv.l,
  preset: argv.p,
  version: argv.v,
};

console.log(argv);

console.log(opts);

// const execNpmVersion = releaseType => (
//   execSync(`npm version ${releaseType}`, { stdio: [0, 1, 2] })
// );

// readChangelog(opts.location);

updateChangelog(argv.l, opts);
