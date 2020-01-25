const assert = require('assert');
const setup = require('./index');

describe('src/index', () => {
  it('exports a function', () => {
    assert.strictEqual(typeof setup, 'function');
  });
  it('returns setup', () => {
    const logger = setup(() => {});
    assert.strictEqual(typeof logger, 'function');
  });
});
