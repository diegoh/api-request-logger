import { createMockContext } from '@shopify/jest-koa-mocks';
import { DefaultContext } from 'koa';
import { errorLogger } from './error-logger';
import ErrorLog from './models/error-log.class';
import Logger from './models/logger.interface';

describe('src/error-logger', () => {
  const ctx: DefaultContext = createMockContext();
  ctx.status = 500;
  ctx.message = 'Internal Server Error';

  const logger: Logger = { error: jest.fn(), info: jest.fn() };
  const middleware = errorLogger(logger);
  const error = new Error('ERR!!');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('calls the error logger function', async () => {
    await middleware(ctx, error);

    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('calls the logger function with the expected parameters', async () => {
    await middleware(ctx, error);

    const { text, json } = new ErrorLog(ctx, error);

    expect(logger.error).toHaveBeenCalledWith(text, json);
  });
});
