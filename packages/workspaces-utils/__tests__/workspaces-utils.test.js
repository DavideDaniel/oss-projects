const path = require('path');

const monorepoRoot = path.resolve(__dirname, '../../../');
const {
  getWorkSpacePathTo,
  getPathsInWorkspace,
  getWorkspaceAbsPaths,
  getWorkspaces,
  getWorkSpaceDirPaths,
  getWorkSpacePackages,
  copyFiles,
  deletePaths,
  deletePath,
} = require('..');

describe('workspaces-utils', () => {
  it('should throw when no path provided', () => {
    expect(() => getWorkspaces()).toThrow();
  });
  it('should return the workspaces patterns', () => {
    expect(getWorkspaces(monorepoRoot)).toEqual(['packages/*']);
  });
  it('should export all the expected parts', () => {
    [
      getWorkSpacePathTo,
      getPathsInWorkspace,
      getWorkspaceAbsPaths,
      getWorkspaces,
      getWorkSpaceDirPaths,
      getWorkSpacePackages,
      copyFiles,
      deletePaths,
      deletePath,
    ].forEach((fn) => expect(fn).toBeTruthy());
  });
});
