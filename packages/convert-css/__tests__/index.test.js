import cssModule from '../index.js';

describe('convert-css module', () => {
  it('should match its snapshot', () => {
    expect(cssModule).toMatchSnapshot();
  });
});
