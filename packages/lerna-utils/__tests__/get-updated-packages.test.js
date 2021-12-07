const getUpdatedPkgs = require('../2.0/get-updated-packages');
const shapeLernaUpdatedCommand = require('../2.0/shape-lerna-updated-command');
const getUpdatedPackages = require('../3.0/get-updated-packages');
const shapeLernaLsCommand = require('../3.0/shape-lerna-ls-command');

describe('2.0', () => {
  describe('getUpdatedPackages', () => {
    it('should be a function', () => {
      expect(getUpdatedPkgs).toBeInstanceOf(Function);
    });
  });
});

describe('3.0', () => {
  describe('getUpdatedPackages', () => {
    it('should be a function', () => {
      expect(getUpdatedPackages).toBeInstanceOf(Function);
    });
  });
});

describe('handling commands across versions', () => {
  test('shaped commands to account for variance', () => {
    expect(shapeLernaLsCommand()).toMatchInlineSnapshot(`"lerna ls --ndjson --since"`);
    expect(shapeLernaUpdatedCommand()).toMatchInlineSnapshot(`"lerna updated --json"`);
  });
  test('handling additional and duplicate arguments', () => {
    const duplicatedArgs = ['--since', '-a', '--since', '-a'];

    expect(shapeLernaUpdatedCommand(duplicatedArgs)).toMatchInlineSnapshot(
      `"lerna updated --json --since -a"`,
    );
    expect(shapeLernaLsCommand(duplicatedArgs)).toMatchInlineSnapshot(
      `"lerna ls --ndjson --since -a"`,
    );
  });
});

describe('handling commands across package managers', () => {
  beforeAll(() => {
    process.env.USE_YARN = true;
  });
  afterAll(() => {
    delete process.env.USE_YARN;
  });
  test('using yarn to call lerna when USE_YARN in env is true', () => {
    expect(shapeLernaLsCommand()).toMatchInlineSnapshot(`"yarn lerna ls --ndjson --since"`);
    expect(shapeLernaUpdatedCommand()).toMatchInlineSnapshot(`"yarn lerna updated --json"`);
  });
});
