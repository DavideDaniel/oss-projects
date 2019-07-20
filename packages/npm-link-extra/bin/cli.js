#!/usr/bin/env node

const own = require('../package.json');
const minimist = require('minimist');
const {
  linkIfExists,
  unlinkIfLinked,
  showSharedDeps,
  showLinkedDeps,
  getDirectories,
  getPackages,
} = require('../lib');

const opts = {
  alias: {
    a: 'all',
    i: 'ignore',
    l: 'link',
    u: 'unlink',
    s: 'show',
    h: 'help',
    v: 'version',
    d: 'dir',
  },
};
const { log } = console;
const argv = minimist(process.argv.slice(2), opts);
const pathToPackages = argv._[0] || argv.d;
const helpText = `
    npm-link-extra v ${own.version}

    Usage
      $ nlx <path> -<cmd> --<options>
      $ npx nlx <path> -<cmd> --<options>
    Commands
      -h, --help        show help menu
      -l, --link        link all dirs if present in dependencies
      -u, --unlink      unlink all linked dependencies
      -s, --show        show all shared and/or linked dependencies
      -i, --ignore      list of packages to ignore while linking
      -v, --version     get npm-link-extra package version
    Options
      -d, --dir         relative path to mononrepo/dir with many modules
      --linked-only     only select currently linked packages
      --shared-only     only select shared dependencies between project and target dir
`;

const options = { ignorePackages: [] };

const normalizeMatcher = (ignoreMatcher) => {
  switch (typeof ignoreMatcher) {
    case 'string':
      return ignoreMatcher.split(',');
    case 'object':
    default:
      return ignoreMatcher;
  }
};

if (argv.i) {
  const ignorePackages = normalizeMatcher(argv.i);
  Object.assign(options, { ignorePackages });
}

if (argv.h) {
  log(helpText);
}

if (argv.l) {
  linkIfExists(getPackages(getDirectories(pathToPackages, options)));
}

if (argv.s) {
  if (argv['linked-only']) {
    showLinkedDeps(options);
  } else if (argv['shared-only']) {
    showSharedDeps(getPackages(getDirectories(pathToPackages, { ignorePackages: [] })));
  } else {
    showSharedDeps(getPackages(getDirectories(pathToPackages, { ignorePackages: [] })));
    showLinkedDeps(options);
  }
}

if (argv.u) {
  unlinkIfLinked(getPackages(getDirectories(pathToPackages, options)));
}
