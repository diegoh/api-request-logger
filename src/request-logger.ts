import { DefaultContext, Next } from 'koa';
import InfoLog from './models/info-log.class';
import Logger from './models/logger.interface';

export default (logger: Logger) => async (
  ctx: DefaultContext,
  next: Next
): Promise<void> => {
  await next();
  const { text, json } = new InfoLog(ctx);
  logger.info(text, json);
};
