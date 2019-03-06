import * as Koa from 'koa';

import * as log4js from 'log4js';

import * as config from './../app.config';

import controllerRegister from './bootstarp/controllerRegister';
import middlewareRegister from './bootstarp/middlewareRegister';

const logger = log4js.getLogger('app');

const app = new Koa();
const registerControllerMiddleware = controllerRegister(app);
middlewareRegister(app, registerControllerMiddleware);

const port: number = process.env.PORT || config.app[process.env.NODE_ENV].port;
app.listen(port, () => {
    logger.trace(`🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});