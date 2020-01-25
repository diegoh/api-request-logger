# @diegoh/api-middleware-request-logger

![](https://github.com/diegoh/api-middleware-request-logger/workflows/Test/badge.svg) ![](https://github.com/diegoh/api-middleware-request-logger/workflows/Security/badge.svg) ![](https://github.com/diegoh/api-middleware-request-logger/workflows/Publish/badge.svg)

Logs requests using the provided logger.

## Usage

This module requires a logger with `error` and `info` methods.

### Example

```js
const Koa = require('koa');
const myLogger = require('./logger');
const requestLogger = require('@diegoh/api-middleware-request-logger');
const requestLoggerMiddleware = requestLogger(myLogger);

const app = new Koa();

app.use(requestLoggerMiddleware);
```

## Development

1. Create a new branch from `master` with a name relevant to the changes you're making. `git branch -b my-new-feature-description`
2. Push the branch and open a Pull Request (PR).
3. Request a code review.
4. **Squash merge** your commits and keep things tidy.

### Unit Tests

`npm run test:unit`

### Coverage

`npm run test:coverage`

### Lint

`npm run lint` or `npm run lint-fix` to automatically fix any linting issues.

### CI/CD

This project uses GitHub actions for CI/CD.
The following secrets are required to publish this package.

- `NPM_TOKEN`
