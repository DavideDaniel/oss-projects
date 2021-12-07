const execa = require('execa');
const checkStdErr = require('../check-stderr');
const shapeLernaUpdatedCommand = require('./shape-lerna-updated-command');

const errString = 'No packages need updating';
const noUpdates = new RegExp(errString);

function evalExpectedOnly(str) {
  // only eval a possible array
  if (str && (str.startsWith('[') || str.startsWith('{'))) {
    // eslint-disable-next-line no-eval
    return eval(str);
    // eslint-enable no-eval
  }
  return null;
}

/**
 * 2.0/getUpdatedPackages
 * @description this version is specific to lerna 2.0 range and is a way to use lerna's output for updated --json and resolve or reject a list of packages
 * @param {object} [logger=console] any logger to log stdout/stderr
 * @param {Array} [lernaUpdatedArgs=[]] valid args for `lerna ls` with lerna 2.0
 * @returns {Promise} promise that resolves list of updated packages only
 */
module.exports = async function getUpdatedPackages(logger = console, lernaUpdatedArgs = []) {
  try {
    const { stdout } = await execa.shell(shapeLernaUpdatedCommand(lernaUpdatedArgs));

    return Promise.resolve({
      packages: evalExpectedOnly(stdout),
    });
  } catch (e) {
    return checkStdErr(e, noUpdates, logger);
  }
};
