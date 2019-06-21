const execa = require('execa');
const checkStdErr = require('../check-stderr');

// NOTE the following regex aligns lerna's expected "error" message for no packages needing updates
const noUpdates = /No .*packages/;

/**
 * getUpdatedPkgs returns a list of updated packages by parsing the output from lerna updated --json
 * @param {Object} logger - a logging object with info method to log results
 * Example stdout
 * yarn run v1.13.0
 * $ /grand/node_modules/.bin/lerna ls --ndjson --since
 * {"name":"grand","version":"1.66.10","private":false,"location":"grand/servers/grand"}
 * Done in 1.02s.
 * @returns {Promise} resolved package list
 */
module.exports = async function getUpdatedPkgs(logger = console) {
  try {
    const { stdout } = await execa.shell('yarn lerna ls --ndjson --since');
    const lines = stdout.split('\n');
    const trimmed = `[${lines.slice(1)}]`;
    const parsedPkgs = JSON.parse(trimmed);

    return Promise.resolve({ packages: parsedPkgs });
  } catch (e) {
    return checkStdErr(e, noUpdates, logger);
  }
};
