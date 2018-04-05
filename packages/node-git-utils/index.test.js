const execa = require('execa');
const ngu = require('./index');

const git = 'git';

jest.mock('execa', () => ({
  sync: jest.fn((command, args, opts) => ({
    command, args, opts, stdout: true,
  })),
}));

describe('node-git-utils', () => {
  const mockOpts = {};
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should call git rev-parse when calling getCurrentSHA', () => {
    ngu.getCurrentSHA(mockOpts);

    expect(execa.sync).toHaveBeenCalledWith(git, ['rev-parse', 'HEAD'], mockOpts);
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

    expect(execa.sync).toHaveBeenCalledWith(git, ['tag', 'test', '-m', 'test'], mockOpts);
  });
  it('should call npm version when calling npmVersion', () => {
    ngu.npmVersion('/location', 'patch', mockOpts);

    expect(execa.sync).toHaveBeenCalledWith('npm', ['version', 'patch'], { cwd: '/location' });
  });
  it('should call npm version --not-tags when calling npmVersion with skipTag', () => {
    ngu.npmVersion('/location', 'patch', { skipTag: true });

    expect(execa.sync).toHaveBeenCalledWith('npm', ['--no-git-tag-version', 'version', 'patch'], { cwd: '/location', skipTag: true });
  });
});
