const { promisify } = require('util');
const invariant = require('invariant');
const rimraf = require('rimraf');
const { getPathsInWorkspace } = require('./workspaces-paths');

const pRimRaf = promisify(rimraf);

function deletePath(fileOrDir, logger = console) {
  return pRimRaf(fileOrDir).then(
    () => logger.error(`Deleted ${fileOrDir}`),
    (err) => logger.error(err),
  );
}

function deletePaths(filesOrDirs, projectRoot, logger = console) {
  invariant(projectRoot, `deletePaths from ${__filename} needs to know the root of your project`);
  const paths = getPathsInWorkspace(filesOrDirs, projectRoot);
  return paths.forEach((wkspc) =>
    wkspc.forEach(async (fileOrDir) => deletePath(fileOrDir, logger)),
  );
}

module.exports = { deletePaths, deletePath };
