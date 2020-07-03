import { format } from 'util';
import { DefaultContext } from 'koa';

export default class Payload {
  method: string;

  url: string;

  status: number;

  statusText: string;

  responseTime?: string;

  error?: string;

  errorMessage?: string;

  constructor(ctx: DefaultContext, error?: Error) {
    this.method = ctx.request.method;
    this.url = ctx.request.url;
    this.status = Number.parseInt(ctx.response.status, 10);
    this.statusText = ctx.response.message;

    const responseTime = ctx.get('X-Response-Time');
    if (responseTime) {
      this.responseTime = `${responseTime}ms`;
    }

    if (error) {
      this.error = format(error);
      this.errorMessage = error.message;
    }
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
