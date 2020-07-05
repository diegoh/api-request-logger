import { createMockContext } from '@shopify/jest-koa-mocks';
import { DefaultContext } from 'koa';
import InfoLog from './models/info-log.class';
import Logger from './models/logger.interface';
import setup from './request-logger';

describe('src/request-logger', () => {
  const ctx: DefaultContext = createMockContext();
  ctx.status = 200;
  ctx.message = 'OK';

  const logger: Logger = { error: jest.fn(), info: jest.fn() };
  const middleware = setup(logger);
  const next = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('calls the next middleware', async () => {
    await middleware(ctx, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('calls the info logger function', async () => {
    await middleware(ctx, next);

    expect(logger.info).toHaveBeenCalledTimes(1);
  });

  it('calls logger function with the expected parameters', async () => {
    await middleware(ctx, next);

    const { text, json } = new InfoLog(ctx);

    expect(logger.info).toHaveBeenCalledWith(text, json);
  });
});
