#!/usr/bin/env node

const { execSync } = require('child_process');

const semver = require('semver');
const conventionalRecommendedBump = require('conventional-recommended-bump');
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
  releaseAs: argv.r,
  location: argv.l,
  preset: argv.p,
  version: argv.v,
};


const typeList = ['major', 'minor', 'patch'].reverse();


function isString(val) {
  return typeof val === 'string';
}

/**
 * extract the in-pre-release type in target version
 *
 * @param version
 * @return {string}
 */
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
 * @param version
 * @param expectType
 * @return {boolean}
 */
function shouldContinuePrerelease(version, expectType) {
  return getCurrentActiveType(version) === expectType;
}


/**
 * calculate the priority of release type,
 * major - 2, minor - 1, patch - 0
 *
 * @param type
 * @return {number}
 */
function getTypePriority(type) {
  return typeList.indexOf(type);
}

function getReleaseType(prerelease, expectedReleaseType, currentVersion) {
  if (isString(prerelease)) {
    if (isInPrerelease(currentVersion)) {
      if (shouldContinuePrerelease(currentVersion, expectedReleaseType) ||
        getTypePriority(getCurrentActiveType(currentVersion)) > getTypePriority(expectedReleaseType)
      ) {
        return 'prerelease';
      }
    }

    return `pre${expectedReleaseType}`;
  }
  return expectedReleaseType;
}


function bumpVersion(releaseAs, callback) {
  return new Promise((resolve, reject) => {
    if (releaseAs) {
      return resolve({
        releaseType: releaseAs,
      });
    }
    conventionalRecommendedBump({
      preset: 'angular',
    }, (err, release) => {
      if (err) return reject(err);
      return resolve(release);
    });
  });
}
// readChangelog(opts.location);
//
bumpVersion(argv.r)
  .then((release) => {
    console.log(process.env.npm_package_version);
    const pkg = {
      version: opts.version || process.env.npm_package_version,
    };

    console.log('pkg', pkg);
    const releaseType = getReleaseType(opts.prerelease, release.releaseType, pkg.version);
    const newVersion = semver.valid(release.releaseType) || semver.inc(pkg.version, release.releaseType);
    console.log('newVersion', newVersion);
    console.log('releaseType', release.releaseType);
    if (!opts.version) {
      opts.version = newVersion;
    }
    console.log('opts', opts);
    updateChangelog(argv.l, opts);
  });
