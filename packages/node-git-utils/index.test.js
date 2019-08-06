const execSync = require('./exec-sync');
const ngu = require('./index');

const git = 'git';

jest.mock('./exec-sync', () =>
  jest.fn((command, args, opts) => ({
    command,
    args,
    opts,
    stdout: true,
  })),
);

describe('node-git-utils', () => {
  const mockOpts = {};
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should call git rev-parse when calling getCurrentSHA', () => {
    ngu.getCurrentSHA(mockOpts);

    expect(execSync).toHaveBeenCalledWith(git, ['rev-parse', 'HEAD'], mockOpts);
  });
  // checkout,
  // cherryPick,
  // commit,
  // getLastTag,
  // getInbetweenCommits,
  // getCommitsSinceLastTag,
  // getLastTaggedCommitInBranch,
  // getLastTaggedCommit,
  // getStringifiedFromLastTag,
  // getCurrentBranch,
  // getCurrentSHA,
  // getTagsFromCommit,
  // hasTags,
  // revert
  it('should call git tag when calling addTag', () => {
    ngu.addTag('test', mockOpts);

    expect(execSync).toHaveBeenCalledWith(git, ['tag', 'test', '-m', 'test'], mockOpts);
  });
  it('should call npm version when calling npmVersion', () => {
    ngu.npmVersion('/location', 'patch', mockOpts);

    expect(execSync).toHaveBeenCalledWith('npm', ['version', 'patch'], { cwd: '/location' });
  });
  it('should call npm version --not-tags when calling npmVersion with skipTag', () => {
    ngu.npmVersion('/location', 'patch', { skipTag: true });

    expect(execSync).toHaveBeenCalledWith('npm', ['--no-git-tag-version', 'version', 'patch'], {
      cwd: '/location',
      skipTag: true,
    });
  });
});
