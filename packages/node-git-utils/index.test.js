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
});
