import * as tagModule from '../index.mjs';

describe('tag-dir-with-version', () => {
  it('should match its snapshot', () => {
    expect(tagModule).toMatchInlineSnapshot();
  });
});
