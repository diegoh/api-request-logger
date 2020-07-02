import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { Logger } from './logger.interface';
declare const _default: (logger: Logger) => (ctx: ParameterizedContext<DefaultState, DefaultContext>, error: Error) => Promise<void>;
export default _default;
