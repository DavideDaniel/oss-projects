const execa = require('execa');

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

module.exports = async function getUpdatedPkgs(logger = console) {
  try {
    const { stdout } = await execa.shell('lerna updated --json');

    return Promise.resolve({
      pkgs: evalExpectedOnly(stdout),
    });
  } catch (e) {
    return checkErr(e, logger);
  }
};
