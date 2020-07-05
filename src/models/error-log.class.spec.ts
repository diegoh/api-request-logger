import { format } from 'util';
import { createMockContext } from '@shopify/jest-koa-mocks';
import ErrorLog from './error-log.class';

describe('src/errorLog.class', () => {
  const error = new Error('ERR!');
  const ctx = createMockContext();
  ctx.status = 500;
  ctx.message = 'Internal Server Error';
  const errorLog = new ErrorLog(ctx, error);

  it('sets error properties', () => {
    expect(errorLog).toHaveProperty('error');
    expect(errorLog).toHaveProperty('errorMessage');
  });

  it('assigns the expected values to error properties', () => {
    const formattedError = format(error);
    expect(errorLog.error).toStrictEqual(formattedError);
    expect(errorLog.errorMessage).toStrictEqual(error.message);
  });

  it('supports error errorLogs', () => {
    const expected = 'GET http://test.com/ 500 Internal Server Error ERR!';
    expect(errorLog.text).toStrictEqual(expected);
  });

  it('supports json errorLogs', () => {
    const expected = JSON.stringify({
      method: 'GET',
      url: 'http://test.com/',
      status: 500,
      statusText: 'Internal Server Error',
      error: format(error)
    });

    expect(errorLog.json).toStrictEqual(expected);
  });
});
