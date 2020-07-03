import { DefaultContext } from 'koa';
import { Logger } from './logger.interface';
import Payload from './payload.class';

export default (logger: Logger) => async (
  ctx: DefaultContext,
  error?: Error
): Promise<void> => {
  const payload = new Payload(ctx, error);
  logger[error ? 'error' : 'info'](payload.text, payload.json);
};
