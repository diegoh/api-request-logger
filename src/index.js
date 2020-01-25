module.exports = logger =>
  function logRequest(ctx, error) {
    const { request, response, status, message } = ctx;
    const prefix = `${request.method} ${request.url}`;
    const ms = response.get('X-Response-Time');
    const logMessage = `${prefix} 🏓 ${status} ${message} ⌛️ ${ms}`;

    const payload = {
      responseTime: ms,
      request: ctx.request,
      response: ctx.response
    };

    const log = JSON.parse(JSON.stringify(payload));

    logger[error ? 'error' : 'info'](logMessage, log);
  };
