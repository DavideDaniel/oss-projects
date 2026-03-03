const { yourFunction } = require('../index');

describe('{{PACKAGE_NAME}}', () => {
  describe('yourFunction', () => {
    it('should process valid input correctly', () => {
      const result = yourFunction('test');
      expect(result).toBe('TEST');
    });

    it('should handle verbose option', () => {
      const result = yourFunction('test', { verbose: true });
      expect(result).toBe('TEST (verbose mode)');
    });

    it('should handle empty options object', () => {
      const result = yourFunction('test', {});
      expect(result).toBe('TEST');
    });

    it('should throw error for invalid input', () => {
      expect(() => yourFunction()).toThrow('Input must be a non-empty string');
      expect(() => yourFunction(null)).toThrow('Input must be a non-empty string');
      expect(() => yourFunction('')).toThrow('Input must be a non-empty string');
      expect(() => yourFunction(123)).toThrow('Input must be a non-empty string');
    });

    it('should handle various string inputs', () => {
      expect(yourFunction('hello')).toBe('HELLO');
      expect(yourFunction('WORLD')).toBe('WORLD');
      expect(yourFunction('MiXeD CaSe')).toBe('MIXED CASE');
    });

    it('should work with special characters', () => {
      expect(yourFunction('hello-world')).toBe('HELLO-WORLD');
      expect(yourFunction('test_123')).toBe('TEST_123');
    });
  });
});
