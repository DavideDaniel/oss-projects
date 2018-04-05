const execa = require('execa');
const ngu = require('./index');

const git = 'git';


describe('node-git-utils', () => {
  const spy = jest.spyOn(execa, 'sync');
  beforeEach(() => {
    spy.mockClear();
  });
  it('should call git when calling getCurrentSHA', () => {
    const mockOpts = {};
    ngu.getCurrentSHA(mockOpts);

    expect(spy).toHaveBeenCalledWith(git, ['rev-parse', 'HEAD'], mockOpts);
  });
  // addTag,
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
  it('should call git when calling addTag', () => {
    const mockOpts = {};
    ngu.addTag(mockOpts);

    expect(spy).toHaveBeenCalledWith(git, ['rev-parse', 'HEAD'], mockOpts);
  });
});
