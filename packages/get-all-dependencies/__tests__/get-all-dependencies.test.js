const { getAllDependencies } = require('../lib/get-all-dependencies');

describe('get-all-dependencies', () => {
  it('will have tests', () => {
    expect(getAllDependencies).toBeTruthy();
  });
});
