# @diegoh/api-request-logger

![Build](https://github.com/diegoh/api-request-logger/workflows/Build/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Package Version](https://img.shields.io/npm/v/@diegoh/api-request-logger)

Koa middleware to log requests using the provided logger.

## Usage

Initialise the module by providing a logger with `error` and `info` methods.

To log a request pass a `koa` ctx object as a parameter after initialisation.

### Example

```js
const myLogger = require('./logger');
const setupRequestLogger = require('@diegoh/api-request-logger');
const logRequest = setupRequestLogger(myLogger);

logRequest(ctx);
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

`npm run lint` or `npm run lint:fix` to automatically fix any linting issues.

### CI/CD

This project uses GitHub actions for CI/CD.
The following secrets are required to publish this package.

- `NPM_TOKEN`
