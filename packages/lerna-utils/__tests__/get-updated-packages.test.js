import getUpdatedPkgs from '../2.0/get-updated-packages';
import getUpdatedPackages from '../3.0/get-updated-packages';

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
