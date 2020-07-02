"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (logger) => async (ctx, error) => {
    const { request, response, status, message } = ctx;
    const { method, url } = request;
    const ms = response.get('X-Response-Time');
    const responseTimeMs = ms ? ` ⌛️${ms}` : '';
    const logMessage = `${method} ${url} 🏓 ${status} ${message}${responseTimeMs}`;
    const payload = {
        responseTime: ms,
        request,
        response
    };
    const log = JSON.parse(JSON.stringify(payload));
    logger[error ? 'error' : 'info'](logMessage, log);
};
//# sourceMappingURL=index.js.map