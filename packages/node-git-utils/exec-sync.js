const execa = require('execa');
/**
 * execSync
 * @description simply wraps execa.sync
 * @param {String} command a shell command
 * @param {Array} args an array of flags/arguments
 * @param {Object} opts an object of options passed to execa
 * @returns {Process} returns a child process via execa.sync
 */
function execSync(command, args, opts) {
  return execa.sync(command, args, opts).stdout;
}

module.exports = execSync;
