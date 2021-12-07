import { getAllDependencies } from '../lib/get-all-dependencies.mjs';

describe('get-all-dependencies', () => {
  it('will have tests', () => {
    expect(getAllDependencies).toBeTruthy();
  });
});
