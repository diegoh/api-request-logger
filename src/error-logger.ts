import { DefaultContext } from 'koa';
import ErrorLog from './models/error-log.class';
import Logger from './models/logger.interface';

export const errorLogger = (logger: Logger) => async (
  ctx: DefaultContext,
  error?: Error
): Promise<void> => {
  const { text, json } = new ErrorLog(ctx, error);
  logger.error(text, json);
};
