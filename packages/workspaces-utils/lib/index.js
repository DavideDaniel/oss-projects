const {
  getWorkSpacePathTo,
  getPathsInWorkspace,
  getWorkspaceAbsPaths,
  getWorkspaceDirNames,
  getWorkspaces,
} = require('./workspaces-paths');

const { getWorkSpaceDirPaths, getWorkSpacePackages } = require('./workspaces-packages');

const { copyFiles, copyFile } = require('./copy-files');

const { deletePaths, deletePath } = require('./delete-paths');

module.exports = {
  getWorkSpacePathTo,
  getPathsInWorkspace,
  getWorkspaceAbsPaths,
  getWorkspaces,
  getWorkSpaceDirPaths,
  getWorkspaceDirNames,
  getWorkSpacePackages,
  copyFile,
  copyFiles,
  deletePaths,
  deletePath,
};
