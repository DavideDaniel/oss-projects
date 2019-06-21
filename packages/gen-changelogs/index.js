const ccCore = require('conventional-changelog-core');
const getStream = require('get-stream');
const dedent = require('dedent');
const path = require('path');
const fs = require('fs-extra');
const conventionalRecommendedBump = require('conventional-recommended-bump');
const importLazy = require('import-lazy')(require);

/**
 * determine the recommended version bump
 * @param {String} releaseAs a semver release type [major|minor|patch]
 * @param {String} [preset='angular'] conventional-changelog preset to use
 * @return {Promise} resolves the determined version bump
 */
function bumpVersion(releaseAs, preset = 'angular') {
  return new Promise((resolve, reject) => {
    if (releaseAs) {
      resolve({
        releaseType: releaseAs,
      });
    }
    conventionalRecommendedBump(
      {
        preset,
      },
      (err, release) => {
        if (err) reject(err);
        resolve(release);
      },
    );
  });
}

const changelogHeader = dedent(`
  # Change Log
  All notable changes to this project will be documented in this file.
  See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.
`);

const getContentOnly = content => {
  const section = content.indexOf('<a name=');
  if (section !== -1) {
    return content.substring(section);
  }
  return content;
};

async function readChangelog(location) {
  const changelog = path.resolve(process.cwd(), location, 'CHANGELOG.md');
  // console.log(changelog);
  try {
    const fullLog = await fs.readFile(changelog, 'utf8');
    const content = getContentOnly(fullLog);
    await [changelog, content];
  } catch (e) {
    return [changelog, getContentOnly('')];
  }
  return Promise.resolve()
    .catch(() => '') // instead of rejecting missing file return empty str
    .then(getContentOnly)
    .then(content => [changelog, content]);
}

function updateChangelog(location, opts) {
  const { preset, version } = opts;
  return importLazy(`conventional-changelog-${preset}`).then(({ conventionalChangelog }) =>
    Promise.all([
      getStream(ccCore({ config: conventionalChangelog }, { version })),
      readChangelog(location),
    ]).then(([updates, [changelogLocation, changelogContents]]) =>
      fs
        .writeFile(
          changelogLocation,
          `${[changelogHeader, updates, changelogContents].join('\n\n').trim()}\n`,
        )
        .then(() => ({
          changelogLocation,
          version,
          location,
          ...opts,
        })),
    ),
  );
}

module.exports = {
  bumpVersion,
  getContentOnly,
  readChangelog,
  updateChangelog,
};
