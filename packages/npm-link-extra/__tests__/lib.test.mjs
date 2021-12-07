import * as nleModule from '../lib/index.mjs';

describe('npm-link-extra', () => {
  it('should match its snapshot', () => {
    expect(nleModule).toMatchSnapshot();
  });
});
