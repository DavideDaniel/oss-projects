const execa = require('execa');
const checkStdErr = require('../check-stderr');

// NOTE the following regex aligns lerna's expected "error" message for no packages needing updates
const noUpdates = /No .*packages/;

/**
 * 3.0/getUpdatedPackages
 * @description this version is specific to lerna 3.0 range and is a way to use lerna's output for updated --json and resolve or reject a list of packages
 * @memberof module:lerna-utils
 * @param {object} [logger=console] a logging object with info method to log results
 * @returns {Promise} promise that resolves list of updated packages only
 */
module.exports = async function getUpdatedPkgs(logger = console) {
  try {
    const { stdout } = await execa.shell('lerna ls --ndjson --since');
    const lines = stdout.split('\n');
    const trimmed = `[${lines.slice(0)}]`;
    const parsedPkgs = JSON.parse(trimmed);

    return Promise.resolve({ packages: parsedPkgs });
  } catch (e) {
    return checkStdErr(e, noUpdates, logger);
  }
};
