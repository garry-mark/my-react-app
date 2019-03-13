import * as Koa from 'koa';

import * as log4js from 'log4js';

import * as config from './../app.config';

import uncaughtExceptionEventRegister from './bootstarp/uncaughtExceptionEventRegister';
import loggerRegister from './bootstarp/loggerRegister';
import mysqlRegister from './bootstarp/mysqlRegister';
import httpClientRegister from './bootstarp/httpClientRegister';
import controllerRegister from './bootstarp/controllerRegister';
import middlewareRegister from './bootstarp/middlewareRegister';
import routerRegister from './bootstarp/routerRegister';

const app = new Koa();

uncaughtExceptionEventRegister();
const loggerMiddleware = loggerRegister();
const controllerMiddleware = controllerRegister(app);
const mysqlMiddleware = mysqlRegister();
const httpClientMiddleware = httpClientRegister();
const { routesMiddleware, allowedMethodsMiddleware } = routerRegister(app);

middlewareRegister(
    app,
    loggerMiddleware,
    mysqlMiddleware,
    httpClientMiddleware,
    controllerMiddleware,
    routesMiddleware,
    allowedMethodsMiddleware
);

const port: number = process.env.PORT || config.app[process.env.NODE_ENV].port;
const logger = log4js.getLogger('app');
app.listen(port, () => {
    logger.trace(`🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});