const assert = require('assert');
const middleware = require('./index');

describe('src/index', () => {
  it('exports a function', () => {
    assert.strictEqual(typeof middleware, 'function');
  });
  it('returns middleware', () => {
    assert.strictEqual(typeof middleware(() => {}), 'function');
  });
});
