const path = require('path');
const invariant = require('invariant');

/**
 * getWorkspaces returns the defined workspace as patterns in a yarn
 * monorepo. It accounts for yarn 1.5.1 when workspaces became an object
 * or array.
 * @param  {String} [pathToRoot]  path to root dir with package.json
 *                                default is appRoot
 * @return {Array}                array of patterns (eg: packages/*)
 */
function getWorkspaces(pathToRoot) {
  invariant(pathToRoot, `getWorkspaces in ${__filename}needs to know the root of your project`);
  const pathToPkgJson = path.resolve(pathToRoot, 'package.json');
  // eslint-disable-next-line import/no-dynamic-require
  const pkgJSON = require(pathToPkgJson); // eslint-disable-line global-require
  return pkgJSON.workspaces.packages || pkgJSON.workspaces;
}

/**
 * getWorkspaceDirNames gets you the dir names in workspace instead of globs.
 * It can optionally take a path to root with default as appRoot inside a node project
 * @param  {String} pathToRoot   path to root dir
 * @return {Array}               names of dirs in workspace
 */
const getWorkspaceDirNames = pathToRoot => getWorkspaces(pathToRoot).map(path.dirname);

/**
 * getWorkspaceAbsPaths can get you absolute paths to directories or files in workspace
 * @param  {String} pathToRoot    path to root dir with default as app root in node project
 * @param {String} pathTo         path to file or dir in workspace
 *
 * @return {Array}               array of paths
 */
const getWorkspaceAbsPaths = pathToRoot => (pathTo) => {
  const wsp = getWorkspaceDirNames(pathToRoot);
  return pathTo
    ? wsp.map(p => path.resolve(pathToRoot, p, pathTo))
    : wsp.map(p => path.resolve(pathToRoot, p));
};

/**
 * getWorkSpacePathTo is a curried fn that takes a file or dir
 * path as the first fn arg and a root path as the second fn arg to
 * return workspace relative paths
 * @param {String} pathToRoot  relative path to root
 * @param {String} pathTo      path to file or dir in workspace
 *
 * @return {Array}             array of paths
 */
const getWorkSpacePathTo = pathToRoot => (pathTo) => {
  const wsp = getWorkspaces(pathToRoot);
  return pathTo
    ? wsp.map(p => path.resolve(pathToRoot, p, pathTo))
    : wsp.map(p => path.resolve(pathToRoot, p));
};

/**
 * getPathsInWorkspace takes an array of paths/filenames and returns
 * workspace relative paths to them
 * @param  {Array} paths    array of file names or paths
 * @return {Array}          array of paths mapped to workspace packages
 */
function getPathsInWorkspace(paths, appRoot) {
  return paths.map(getWorkSpacePathTo(appRoot));
}

module.exports = {
  getWorkSpacePathTo,
  getPathsInWorkspace,
  getWorkspaceAbsPaths,
  getWorkspaces,
};
