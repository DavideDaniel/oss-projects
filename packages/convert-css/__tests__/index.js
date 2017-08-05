const convert = require('../index');
const assert = require('assert');

assert.equal(typeof convert, 'object');
assert.equal(typeof convert.convertKey, 'function');
assert.equal(typeof convert.convertKeyNames, 'function');
assert.equal(typeof convert.cssToJson, 'function');
assert.equal(typeof convert.cssToCamelizedJson, 'function');
