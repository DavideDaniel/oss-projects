const tagModule = require('../index');

describe('tag-dir-with-version', () => {
  it('should match its snapshot', () => {
    expect(tagModule).toMatchSnapshot();
  });
});
