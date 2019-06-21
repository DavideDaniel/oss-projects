const getUpdatedPkgs = require('../2.0/get-updated-packages');
const getUpdatedPackages = require('../3.0/get-updated-packages');

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
