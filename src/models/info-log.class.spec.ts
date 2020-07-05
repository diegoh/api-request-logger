import { createMockContext } from '@shopify/jest-koa-mocks';
import InfoLog from './info-log.class';

describe('src/infoLog.class', () => {
  const responseTime = 1000;

  const ctx = createMockContext();
  ctx.status = 200;
  ctx.message = 'OK';

  const infoLog = new InfoLog(ctx);

  const ctxWithResponseTime = createMockContext({
    headers: {
      'X-Response-Time': `${responseTime}`
    }
  });

  ctxWithResponseTime.status = 200;
  ctxWithResponseTime.message = 'OK';
  const infoLogWithResponseTime = new InfoLog(ctxWithResponseTime);

  it('sets the expected properties', () => {
    expect(infoLog).toHaveProperty('method');
    expect(infoLog).toHaveProperty('url');
    expect(infoLog).toHaveProperty('status');
    expect(infoLog).toHaveProperty('statusText');
  });
  it('assigns the expected values', () => {
    expect(infoLog.method).toStrictEqual(ctx.request.method);
    expect(infoLog.url).toStrictEqual(ctx.request.url);
    expect(infoLog.status).toStrictEqual(ctx.response.status);
    expect(infoLog.statusText).toStrictEqual(ctx.response.message);
  });

  it('sets response time properties', () => {
    expect(infoLogWithResponseTime).toHaveProperty('responseTime');
  });
  it('assigns the expected values to response time properties', () => {
    expect(infoLogWithResponseTime.responseTime).toStrictEqual(
      `${responseTime}ms`
    );
  });

  it('supports the default infoLog', () => {
    const expected = 'GET http://test.com/ 200 OK';
    expect(infoLog.text).toStrictEqual(expected);
  });

  it('supports infoLogs with response time', () => {
    const expected = 'GET http://test.com/ 200 OK 1000ms';
    expect(infoLogWithResponseTime.text).toStrictEqual(expected);
  });

  it('supports the default infoLog', () => {
    const expected = JSON.stringify({
      method: 'GET',
      url: 'http://test.com/',
      status: 200,
      statusText: 'OK'
    });

    expect(infoLog.json).toStrictEqual(expected);
  });

  it('supports infoLogs with response time', () => {
    const expected = JSON.stringify({
      method: 'GET',
      url: 'http://test.com/',
      status: 200,
      statusText: 'OK',
      responseTime: '1000ms'
    });

    expect(infoLogWithResponseTime.json).toStrictEqual(expected);
  });
});
