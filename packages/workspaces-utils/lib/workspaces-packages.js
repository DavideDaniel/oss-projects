const path = require('path');
const nle = require('npm-link-extra');
const { getWorkspaces } = require('./workspaces-paths');

/**
 * Resolves a workspace pattern (e.g. packages/* or packages-modules/*/*)
 * to concrete directory paths.
 * @param {String} pathToRoot root dir with package.json
 * @param {String} pattern workspace pattern
 * @return {Array}
 */
const resolveWorkspacePattern = (pathToRoot, pattern) => {
  const parts = pattern.split('/').filter(Boolean);

  return parts.reduce(
    (acc, part) =>
      part === '*'
        ? acc.reduce((dirs, currentDir) => dirs.concat(nle.getDirectories(currentDir)), [])
        : acc.map((currentDir) => path.resolve(currentDir, part)),
    [path.resolve(pathToRoot)]
  );
};

/**
 * getWorkspaceDirPaths gets you concatenated list of dir paths in workspace
 * @param  {String} pathToRoot    path to root dir with default as app root in node project
 * @return {Array}                array of paths in workspace using npm-link-extras getDirectories
 */
const getWorkSpaceDirPaths = (pathToRoot) =>
  getWorkspaces(pathToRoot).reduce(
    (arr, workspacePattern) => arr.concat(resolveWorkspacePattern(pathToRoot, workspacePattern)),
    []
  );

/**
 * getWorkSpacePackages gets you concatenated list of package.jsons in workspace
 * @param  {String} pathToRoot    path to root dir with default as app root in node project
 * @return {Array}                array of paths in workspace using npm-link-extras getPackages
 */
const getWorkSpacePackages = (pathToRoot) => nle.getPackages(getWorkSpaceDirPaths(pathToRoot));

module.exports = {
  getWorkSpaceDirPaths,
  getWorkSpacePackages,
};
