const pRequire = require('./index');

describe('pRequire', () => {
  it('should resolve a require when present', async () => {
    const pkg = await pRequire('./package.json');
    expect(pkg.name).toEqual('p-require');
  });
  it('should reject when module is not available', async () => {
    await pRequire('THROW_ERROR').catch(err => expect(err).toBeTruthy());
  });
});
