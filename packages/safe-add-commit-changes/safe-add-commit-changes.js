const execa = require('execa');
const testForNoFilesMatched = require('./test-for-no-match');

/**
 * safeAddCommitChanges
 * @param {string} fileTypes what to git add - can be glob or type of files {snapshots|docs|tests|js} + more if custom patterns provided
 * @param {Object} [logger=console] a logger object with error and info methods
 * @param {Object} [patterns={}] a js object with key value pairs of  pattern for additional fileType to path definitions
 * @returns {Promise} resolves a success or failure to add changes
 */
function safeAddCommitChanges(fileTypes, logger = console, patterns = {}) {
  const map = {
    snapshots: '**/*.snap',
    tests: '**/*test.js',
    docs: '**/*.md',
    js: '**/*.js',
    ...patterns,
  };
  const filePattern = map[fileTypes] || fileTypes;
  if (!fileTypes) {
    logger.error(`Need a glob, or path or file for ${__filename}`);
  }

  return execa('git', ['add', `${filePattern}`])
    .then(({ stderr }) => {
      if (stderr) {
        logger.error(stderr);
        const noChanges = stderr.test(/did not match/);
        if (noChanges) {
          logger.info(`No changes for ${filePattern}`);
        }
      }
      return execa('git', ['commit', '-m', `chore: auto update ${filePattern}`])
        .then(res => {
          if (testForNoFilesMatched(res.stderr)) {
            return logger.info(`No files were matched for ${filePattern}.`);
          }
          return logger.info(res.stdout);
        })
        .catch(err => {
          if (testForNoFilesMatched(err.message)) {
            logger.warn(`Catching: No matches found for ${filePattern}.`);
          }
          return logger.error(`Error while attempting to commit ${filePattern}:\n${err}`);
        });
    })
    .catch(err => {
      const noChanges = /did not match/.test(err.message);
      if (noChanges) {
        return logger.error(`No matches found for ${filePattern}`);
      }
      return logger.error(err);
    });
}

module.exports = safeAddCommitChanges;
