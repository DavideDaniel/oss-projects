#!/usr/bin/env node

const semver = require('semver');

const { argv } = require('yargs')
  .usage('Usage: $0 [flags]')
  .example('$0 -p angular', 'choose a conventional-changelog-preset')
  .example('$0 -r minor', 'manually set release type as minor')
  .example('$0 -l ./', 'set the location of CHANGELOG.md to ./')
  .example('$0 -f 1.1.0', 'manually set the version to bump from')
  .help('h')
  .alias('h', 'help')
  .alias('l', 'location')
  .default('l', process.cwd());

const { bumpVersion, updateChangelog } = require('./index');

const opts = {
  preset: argv.p,
  releaseAs: argv.r,
  location: argv.l,
  version: argv.v,
};

const typeList = ['major', 'minor', 'patch'].reverse();

function isString(val) {
  return typeof val === 'string';
}

/**
 * extract the in-pre-release type in target version
 * @param {String} version
 * @return {string}
 */
// eslint-disable-next-line consistent-return
function getCurrentActiveType(version) {
  for (let i = 0; i < typeList.length; i += 1) {
    if (semver[typeList[i]](version)) {
      return typeList[i];
    }
  }
}

function isInPrerelease(version) {
  return Array.isArray(semver.prerelease(version));
}

/**
 * if a version is currently in pre-release state,
 * and if it current in-pre-release type is same as expect type,
 * it should continue the pre-release with the same type
 *
 * @param {String} version
 * @param {String} expectType
 * @return {boolean}
 */
function shouldContinuePrerelease(version, expectType) {
  return getCurrentActiveType(version) === expectType;
}

/**
 * calculate the priority of release type,
 * major - 2, minor - 1, patch - 0
 *
 * @param {String} type
 * @return {number}
 */
function getTypePriority(type) {
  return typeList.indexOf(type);
}

function getReleaseType(prerelease, expectedReleaseType, currentVersion) {
  if (isString(prerelease)) {
    if (isInPrerelease(currentVersion)) {
      if (
        shouldContinuePrerelease(currentVersion, expectedReleaseType) ||
        getTypePriority(getCurrentActiveType(currentVersion)) > getTypePriority(expectedReleaseType)
      ) {
        return 'prerelease';
      }
    }

    return `pre${expectedReleaseType}`;
  }
  return expectedReleaseType;
}

bumpVersion(argv.r, argv.p).then(async release => {
  const pkg = {
    version: opts.version || process.env.npm_package_version,
  };

  const releaseType = getReleaseType(opts.prerelease, release.releaseType, pkg.version);
  const newVersion = semver.valid(releaseType) || semver.inc(pkg.version, releaseType);

  if (!opts.version) {
    opts.version = newVersion;
  }

  if (!opts.preset) {
    opts.preset = 'angular';
  }

  updateChangelog(argv.l, opts);
});
