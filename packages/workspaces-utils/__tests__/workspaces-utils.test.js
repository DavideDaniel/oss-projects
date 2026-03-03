const fs = require('fs');
const os = require('os');
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
  it('should resolve nested workspace patterns for directory paths', () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workspaces-utils-'));

    fs.writeFileSync(
      path.join(tmpRoot, 'package.json'),
      JSON.stringify({ workspaces: ['packages/*', 'packages-modules/*/*'] })
    );

    fs.mkdirSync(path.join(tmpRoot, 'packages', 'sample-core'), { recursive: true });
    fs.mkdirSync(path.join(tmpRoot, 'packages-modules', 'counter', 'browser'), { recursive: true });
    fs.mkdirSync(path.join(tmpRoot, 'packages-modules', 'counter', 'server'), { recursive: true });

    const result = getWorkSpaceDirPaths(tmpRoot);

    expect(result).toContain(path.join(tmpRoot, 'packages', 'sample-core'));
    expect(result).toContain(path.join(tmpRoot, 'packages-modules', 'counter', 'browser'));
    expect(result).toContain(path.join(tmpRoot, 'packages-modules', 'counter', 'server'));
    expect(result).not.toContain(path.join(tmpRoot, 'packages-modules', 'counter'));
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
