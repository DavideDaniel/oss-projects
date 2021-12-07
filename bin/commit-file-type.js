import execa from 'execa';
import logger from './logger.mjs';

const testForNoFilesMatched = (msg) => /ENOENT|no changes/.test(msg);
const fileType = process.argv[2];
const map = {
  snapshots: '**/*.snap',
  docs: '**/*.md',
};

if (!fileType) {
  logger.error(`Need fileType for ${__filename}`);
}
const filePattern = map[fileType];
execa('git', ['add', filePattern])
  .then(({ stderr }) => {
    if (stderr) {
      logger.error(stderr);
      const noChanges = stderr.test(/did not match/);
      if (noChanges) {
        logger.success(`No changes for ${fileType}`);
      }
    }
    return execa('git', ['commit', '-m', `chore: auto update ${fileType}`])
      .then((res) => {
        if (testForNoFilesMatched(res.stderr)) {
          return logger.success(`No files were matched for ${fileType}.`);
        }
        return logger.success(res.stdout);
      })
      .catch((err) => {
        if (testForNoFilesMatched(err.message)) {
          logger.warn(`Catching: No files were matched for ${fileType}.`);
        }
        return logger.error(`Error while attempting to commit ${fileType}:\n${err}`);
      });
  })
  .catch((err) => {
    const noChanges = /did not match/.test(err.message);
    if (noChanges) {
      return logger.error(`No matches found for ${filePattern}`);
    }
    return logger.error(err);
  });
