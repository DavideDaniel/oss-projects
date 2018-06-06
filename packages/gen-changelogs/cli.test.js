/* eslint-disable global-require */

jest.mock('import-lazy', () => jest.fn(m => () => Promise.resolve(m)));
jest.mock('conventional-changelog-core');
jest.mock('get-stream');
jest.mock('dedent');
jest.mock('semver', () => ({
  valid: jest.fn(() => '1.2.3'),
}));

describe('Running the cli', () => {
  jest.doMock('./index.js', () => ({
    bumpVersion: jest.fn(() => Promise.resolve({ releaseType: 'minor' })),
    updateChangelog: jest.fn(),
  }));
  const { bumpVersion, updateChangelog } = require('./index');
  it('should determine version bump and then update the changelog', async () => {
    const location = process.cwd();
    const args = {
      preset: 'angular',
      releaseAs: undefined,
      version: '1.2.3',
      location,
    };
    await require('./cli');
    expect(bumpVersion).toHaveBeenCalled();
    expect(updateChangelog).toHaveBeenCalledWith(location, args);
  });
});
