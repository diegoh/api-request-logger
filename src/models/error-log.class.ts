import { format } from 'util';
import { DefaultContext } from 'koa';
import InfoLog from './info-log.class';
import Log from './log.interface';

export default class ErrorLog extends InfoLog implements Log {
  error: string;

  errorMessage: string;

  constructor(ctx: DefaultContext, error: Error) {
    super(ctx);
    this.error = format(error);
    this.errorMessage = error.message;
  }

  get text(): string {
    return [
      this.method,
      this.url,
      this.status,
      this.statusText,
      this.errorMessage,
      this.responseTime
    ]
      .filter((item) => !!item)
      .join(' ');
  }

  get json(): string {
    const output = { ...this };
    delete output.errorMessage;

    return JSON.stringify(output);
  }
}
