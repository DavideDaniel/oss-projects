#!/usr/bin/env node
const { argv } = require('yargs')
  .usage(
    '$0 [dir] [replacement]',
    'Update matched files in a directory with name and version of package',
    (yargs) => {
      yargs
        .positional('dir', {
          describe: 'A directory to glob over',
          default: process.cwd(),
        })
        .option('dir', { type: 'string' })
        .positional('replacement', {
          aliases: ['r', 'replacement'],
          describe: 'Replacement for placeholder, ideally name + version of package',
          default: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
        })
        .option('r', { type: 'string' });
    },
  )
  .help('h', 'help')
  .alias('r', 'replacement')
  .alias('p', 'placeholder')
  .alias('i', 'ignore')
  .default('i', '')
  .alias('f', 'fileNames')
  .default('p', '__VERSION_HERE__');

const { tagDirWithVersion } = require('./index');

const { dir, placeholder, replacement, ignore } = argv;

const ignorePaths = [];
const ignorePatterns = [];

const ignores = ignore.split(',').filter(Boolean);
for (let index = 0; index < ignores.length; index += 1) {
  const ignoreStr = ignores[index];
  if (ignoreStr.indexOf('*') > -1) {
    ignorePatterns.push(ignoreStr);
  } else {
    ignorePaths.push(ignoreStr);
  }
}

tagDirWithVersion({
  verbose: argv.verbose,
  placeholder,
  replacement,
  dir,
  ignorePatterns,
  ignorePaths,
});
