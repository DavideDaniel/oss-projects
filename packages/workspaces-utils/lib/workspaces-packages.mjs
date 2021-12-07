import * as nle from 'npm-link-extra';
import { getWorkspaceAbsPaths } from './workspaces-paths';

/**
 * getWorkspaceDirPaths gets you concatenated list of dir paths in workspace
 * @param  {String} pathToRoot    path to root dir with default as app root in node project
 * @return {Array}                array of paths in workspace using npm-link-extras getDirectories
 */
const getWorkSpaceDirPaths = (pathToRoot) =>
  getWorkspaceAbsPaths(pathToRoot)().reduce((arr, wsp) => arr.concat(nle.getDirectories(wsp)), []);

/**
 * getWorkSpacePackages gets you concatenated list of package.jsons in workspace
 * @param  {String} pathToRoot    path to root dir with default as app root in node project
 * @return {Array}                array of paths in workspace using npm-link-extras getPackages
 */
const getWorkSpacePackages = (pathToRoot) => nle.getPackages(getWorkSpaceDirPaths(pathToRoot));

export { getWorkSpaceDirPaths, getWorkSpacePackages };
