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
});
