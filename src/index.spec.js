const assert = require('assert');
const example = require('./index');

describe('src/index', () => {
  it('exports an init function', () => {
    assert.strictEqual(typeof example, 'function');
  });
  it('returns true', () => {
    assert.strictEqual(example(), true);
  });
});
