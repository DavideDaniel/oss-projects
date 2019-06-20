const execa = require('execa');

// NOTE the following regex aligns lerna's expected "error" message for no packages needing updates
const noUpdates = /No .*packages/;

/**
 * checkErr
 * @description evaluates the stdout from an error that might happen while publishing. We want only relevant errors rejecting.
 * @param {string} str the stdout string that lets us check lerna --json safely and respond with appropriate exit code for jenkins
 * @param {Object} logger - a logging object with info method to log results
 * @returns {Promise} an evaluated str from stderr
 */
function checkErr(str, logger = console) {
  try {
    const obj = JSON.stringify(str);
    const { stderr } = JSON.parse(obj);
    if (stderr && noUpdates.test(stderr)) {
      logger.info(stderr);
      return Promise.resolve({
        noTags: true,
      });
    }
    return Promise.reject(str);
  } catch (e) {
    return Promise.reject(e);
  }
}

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

    return Promise.resolve({ pkgs: parsedPkgs });
  } catch (e) {
    return checkErr(e, logger);
  }
};
