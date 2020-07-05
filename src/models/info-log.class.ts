import { DefaultContext } from 'koa';
import Log from './log.interface';

export default class InfoLog implements Log {
  method: string;

  url: string;

  status: number;

  statusText: string;

  responseTime?: string;

  constructor(ctx: DefaultContext) {
    this.method = ctx.request.method;
    this.url = ctx.request.url;
    this.status = Number.parseInt(ctx.response.status, 10);
    this.statusText = ctx.response.message;

    const responseTime = ctx.request.get('X-Response-Time');
    if (responseTime) {
      this.responseTime = `${responseTime}ms`;
    }
  }

  get text(): string {
    return [
      this.method,
      this.url,
      this.status,
      this.statusText,
      this.responseTime
    ]
      .filter((item) => !!item)
      .join(' ');
  }

  get json(): string {
    const output = { ...this };

    return JSON.stringify(output);
  }
}
