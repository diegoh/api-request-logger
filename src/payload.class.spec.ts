import { format } from 'util';
import { createMockContext } from '@shopify/jest-koa-mocks';
import Payload from './payload.class';

describe('src/payload.class', () => {
  const error = new Error('ERR!');
  const responseTime = 1000;

  const ctx = createMockContext();
  ctx.status = 200;
  ctx.message = 'OK';
  const payload = new Payload(ctx);

  const ctxWithResponseTime = createMockContext({
    headers: {
      'X-Response-Time': `${responseTime}`
    }
  });
  ctxWithResponseTime.status = 200;
  ctxWithResponseTime.message = 'OK';
  const payloadWithResponseTime = new Payload(ctxWithResponseTime);

  const ctxWithError = createMockContext();
  ctxWithError.status = 500;
  ctxWithError.message = 'Internal Server Error';
  const payloadWithError = new Payload(ctxWithError, error);

  const ctxWithErrorAndResponseTime = createMockContext({
    headers: {
      'X-Response-Time': `${responseTime}`
    }
  });
  ctxWithErrorAndResponseTime.status = 500;
  ctxWithErrorAndResponseTime.message = 'Internal Server Error';
  const payloadWithErrorAndResponseTime = new Payload(
    ctxWithErrorAndResponseTime,
    error
  );

  describe('sets the expected properties', () => {
    it('sets the expected method property', () => {
      expect(payload).toHaveProperty('method');
      expect(payload.method).toStrictEqual(ctx.request.method);
    });
    it('sets the expected url property', () => {
      expect(payload).toHaveProperty('url');
      expect(payload.url).toStrictEqual(ctx.request.url);
    });
    it('sets the expected status property', () => {
      expect(payload).toHaveProperty('status');
      expect(payload.status).toStrictEqual(ctx.response.status);
    });
    it('sets the expected statusText property', () => {
      expect(payload).toHaveProperty('statusText');
      expect(payload.statusText).toStrictEqual(ctx.response.message);
    });
    describe('exclusions', () => {
      it('does not set a responseTime property', () => {
        expect(payload).not.toHaveProperty('responseMessage');
      });

      it('does not set error properties', () => {
        expect(payload).not.toHaveProperty('error');
        expect(payload).not.toHaveProperty('errorMessage');
      });
    });
  });

  describe('responseTime', () => {
    it('sets response time properties', () => {
      expect(payloadWithResponseTime).toHaveProperty('responseTime');
    });
    it('assigns the expected values to response time properties', () => {
      expect(payloadWithResponseTime.responseTime).toStrictEqual(
        `${responseTime}ms`
      );
    });
  });

  describe('errors', () => {
    it('sets error properties', () => {
      expect(payloadWithError).toHaveProperty('error');
      expect(payloadWithError).toHaveProperty('errorMessage');
    });

    it('assigns the expected values to error properties', () => {
      const formattedError = format(error);
      expect(payloadWithError.error).toStrictEqual(formattedError);
      expect(payloadWithError.errorMessage).toStrictEqual(error.message);
    });
  });

  describe('prepares strings for console logs', () => {
    it('supports the default payload', () => {
      const expected = 'GET http://test.com/ 200 OK';
      expect(payload.text).toStrictEqual(expected);
    });
    it('supports payloads with response time', () => {
      const expected = 'GET http://test.com/ 200 OK 1000ms';
      expect(payloadWithResponseTime.text).toStrictEqual(expected);
    });
    it('supports error payloads', () => {
      const expected = 'GET http://test.com/ 500 Internal Server Error ERR!';
      expect(payloadWithError.text).toStrictEqual(expected);
    });
    it('supports error payloads with response time', () => {
      const expected =
        'GET http://test.com/ 500 Internal Server Error ERR! 1000ms';
      expect(payloadWithErrorAndResponseTime.text).toStrictEqual(expected);
    });
  });

  describe('prepares strings for json logs', () => {
    it('supports the default payload', () => {
      const expected = JSON.stringify({
        method: 'GET',
        url: 'http://test.com/',
        status: 200,
        statusText: 'OK'
      });

      expect(payload.json).toStrictEqual(expected);
    });

    it('supports payloads with response time', () => {
      const expected = JSON.stringify({
        method: 'GET',
        url: 'http://test.com/',
        status: 200,
        statusText: 'OK',
        responseTime: '1000ms'
      });

      expect(payloadWithResponseTime.json).toStrictEqual(expected);
    });

    it('supports error payloads', () => {
      const expected = JSON.stringify({
        method: 'GET',
        url: 'http://test.com/',
        status: 500,
        statusText: 'Internal Server Error',
        error: format(error)
      });

      expect(payloadWithError.json).toStrictEqual(expected);
    });

    it('supports error payloads with response time', () => {
      const expected = JSON.stringify({
        method: 'GET',
        url: 'http://test.com/',
        status: 500,
        statusText: 'Internal Server Error',
        responseTime: '1000ms',
        error: format(error)
      });

      expect(payloadWithErrorAndResponseTime.json).toStrictEqual(expected);
    });
  });
});
