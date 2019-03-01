import * as Koa from 'koa';

import * as log4js from 'log4js';

import * as config from '../app.config';

import log4jMiddleware from './middleware/log4j';

import handleErrorMiddleware from './middleware/handleError';

import apiRoutes from './router/';

const logger = log4js.getLogger();

const port = process.env.PORT || config.app[process.env.NODE_ENV].port;

const app = new Koa();

app.use(handleErrorMiddleware());
app.use(log4jMiddleware());

// ApiMiddleware handle for '/api/*'
app.use(apiRoutes.routes()).use(apiRoutes.allowedMethods());

app.listen(port, () => {
    logger.trace(
        `\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
    );
});