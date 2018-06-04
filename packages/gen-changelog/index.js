const ccCore = require('conventional-changelog-core');
const getStream = require('get-stream');
const dedent = require('dedent');
const { resolve } = require('path');
const fs = require('fs-extra');
const importLazy = require('import-lazy')(require);
const pRequire = require('require-then');

const changelogHeader = dedent(`
  # Change Log
  All notable changes to this project will be documented in this file.
  See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.
`);

const getContentOnly = (content) => {
  const section = content.indexOf('<a name=');
  if (section !== -1) {
    return content.substring(section);
  }
  return content;
};

async function readChangelog(location) {
  console.log(location);
  const changelog = resolve(process.cwd(), location, 'CHANGELOG.md');
  // console.log(changelog);
  try {
    const fullLog = await fs.readFile(changelog, 'utf8');
    const content = getContentOnly(fullLog);
    console.log(fullLog);
    console.log();
    console.log(content);
    await [changelog, content];
  } catch (e) {
    console.log(e);
    return [changelog, getContentOnly('')];
  }
  // return Promise.resolve()
  //   .then(async () => {
  //
  //   })
  //   .catch(() => '') // instead of rejecting missing file return empty str
  //   .then(getContentOnly)
  //   .then(content => [changelog, content]);
}

function updateChangelog(location, opts) {
  const { preset, version } = opts;
  return importLazy(`conventional-changelog-${preset}`)
    .then(({ conventionalChangelog }) => Promise.all([
      getStream(ccCore(
        { config: conventionalChangelog },
        { version },
      )),
      readChangelog(location),
    ]).then(([updates, [changelogLocation, changelogContents]]) =>
      fs.writeFile(
        changelogLocation,
        `${[changelogHeader, updates, changelogContents].join('\n\n').trim()}\n`,
      ).then(() => ({
        changelogLocation, version, location, ...opts,
      }))));
}

module.exports = {
  getContentOnly,
  readChangelog,
  updateChangelog,
};
