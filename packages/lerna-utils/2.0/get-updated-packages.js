const execa = require('execa');
const checkStdErr = require('../check-stderr');

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

module.exports = async function getUpdatedPkgs(logger = console) {
  try {
    const { stdout } = await execa.shell('lerna updated --json');

    return Promise.resolve({
      packages: evalExpectedOnly(stdout),
    });
  } catch (e) {
    return checkStdErr(e, noUpdates, logger);
  }
};
