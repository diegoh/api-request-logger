import { createMockContext } from '@shopify/jest-koa-mocks';
import { DefaultContext } from 'koa';
import { Logger } from './logger.interface';
import Payload from './payload.class';
import setup from './index';

describe('src/index', () => {
  let ctx: DefaultContext;
  let logger: Logger;
  let middleware: (ctx: DefaultContext, error?: Error) => Promise<void>;
  const error = new Error('ERR!!');

  beforeEach(() => {
    logger = { error: jest.fn(), info: jest.fn() };
    middleware = setup(logger);
    ctx = createMockContext();
  });

  describe('when handling info requests', () => {
    beforeEach(() => {
      ctx.status = 200;
      ctx.message = 'OK';
    });

    it('calls the info logger function', () => {
      middleware(ctx);

      expect(logger.info).toHaveBeenCalledTimes(1);
    });
    it('calls logger function with the expected parameters', () => {
      middleware(ctx);

      const payload = new Payload(ctx);
      expect(logger.info).toHaveBeenCalledWith(payload.text, payload.json);
    });
  });

  describe('when handling errors', () => {
    beforeEach(() => {
      ctx.status = 500;
      ctx.message = 'Internal Server Error';
    });

    it('calls the error logger function', () => {
      middleware(ctx, error);
      expect(logger.error).toHaveBeenCalledTimes(1);
    });

    it('calls the logger function with the expected parameters', () => {
      middleware(ctx, error);

      const payload = new Payload(ctx, error);
      expect(logger.error).toHaveBeenCalledWith(payload.text, payload.json);
    });
  });
});
