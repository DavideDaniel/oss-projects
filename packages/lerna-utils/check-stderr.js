/**
 * checkStdErr
 * @description evaluates the stdout from an error that might happen while publishing. We want only relevant errors rejecting.
 * @param {string} str the stdout string that lets us check lerna --json safely and respond with appropriate exit code for jenkins
 * @param {Object} regex a regex to test the string
 * @param {Object} logger - a logging object with info method to log results
 * @returns {Promise} an evaluated str from stderr
 */
module.exports = function checkStdErr(str, regex, logger = console) {
  try {
    const obj = JSON.stringify(str);
    const { stderr } = JSON.parse(obj);
    if (stderr && regex.test(stderr)) {
      logger.info(stderr);
      return Promise.resolve({
        packages: [],
      });
    }
    return Promise.reject(str);
  } catch (e) {
    return Promise.reject(e);
  }
};
