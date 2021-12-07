import path from 'path';
import * as worspacesUtilsModule from '../lib/index.mjs';

const monorepoRoot = path.resolve(__dirname, '../../../');

describe('workspaces-utils', () => {
  it('should throw when no path provided', () => {
    expect(() => worspacesUtilsModule.getWorkspaces()).toThrow();
  });
  it('should return the workspaces patterns', () => {
    expect(worspacesUtilsModule.getWorkspaces(monorepoRoot)).toEqual(['packages/*']);
  });
  it('should export all the expected parts', () => {
    expect(worspacesUtilsModule).toMatchInlineSnapshot();
  });
});
