const execa = require('execa');
const logger = require('./logger');

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

function checkErr(str) {
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

async function getUpdatedPkgs() {
  try {
    const { stdout } = await execa
      .shell('lerna updated --json');

    return Promise.resolve({
      pkgs: evalExpectedOnly(stdout),
    });
  } catch (e) {
    return checkErr(e);
  }
}

async function getTouchedPkgs() {
  try {
    const { stdout } = await execa
      .shell('lerna ls --since --json');

    return Promise.resolve({
      pkgs: evalExpectedOnly(stdout),
    });
  } catch (e) {
    return checkErr(e);
  }
}

module.exports = { getUpdatedPkgs, getTouchedPkgs };
