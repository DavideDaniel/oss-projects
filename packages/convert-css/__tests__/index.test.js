const cssModule = require('../index');

describe('convert-css module', () => {
  it('should match its snapshot', () => {
    expect(cssModule).toMatchSnapshot();
  });
});
