/**
 * {{PACKAGE_NAME}} - {{PACKAGE_DESCRIPTION}}
 * @module {{PACKAGE_NAME}}
 */

'use strict';

/**
 * Example function that demonstrates the package functionality
 *
 * @param {string} input - The input value to process
 * @param {Object} [options={}] - Optional configuration
 * @param {boolean} [options.verbose=false] - Enable verbose output
 * @returns {string} The processed result
 * @throws {Error} When input is invalid
 *
 * @example
 * const result = yourFunction('example');
 * console.log(result); // 'EXAMPLE'
 *
 * @example
 * const result = yourFunction('test', { verbose: true });
 * console.log(result); // 'TEST (verbose mode)'
 */
function yourFunction(input, options = {}) {
  if (!input || typeof input !== 'string') {
    throw new Error('Input must be a non-empty string');
  }

  const { verbose = false } = options;

  const result = input.toUpperCase();

  return verbose ? `${result} (verbose mode)` : result;
}

module.exports = {
  yourFunction,
};
