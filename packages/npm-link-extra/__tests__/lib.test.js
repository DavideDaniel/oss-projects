const nleModule = require('../lib');

describe('npm-link-extra', () => {
  it('should match its snapshot', () => {
    expect(nleModule).toMatchSnapshot();
  });
});
