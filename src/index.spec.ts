const example = require('./index');

describe('src/index', () => {
  it('exports an init function', () => {
    expect(typeof example).toBe('function');
  });
  it('returns true', () => {
    expect(example()).toBe(true)
  });
});
