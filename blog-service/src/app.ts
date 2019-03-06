import * as Koa from 'koa';

import * as log4js from 'log4js';

import * as config from './../app.config';

import uncaughtExceptionEventRegister from './bootstarp/uncaughtExceptionEventRegister';
import loggerRegister from './bootstarp/loggerRegister';
import mysqlRegister from './bootstarp/mysqlRegister';
import controllerRegister from './bootstarp/controllerRegister';
import middlewareRegister from './bootstarp/middlewareRegister';
import routerRegister from './bootstarp/routerRegister';

const logger = log4js.getLogger('app');

const app = new Koa();

uncaughtExceptionEventRegister();
const loggerMiddleware = loggerRegister();
const controllerMiddleware = controllerRegister(app);
const mysqlMiddleware = mysqlRegister();
const { routesMiddleware, allowedMethodsMiddleware } = routerRegister(app);

middlewareRegister(
    app,
    loggerMiddleware,
    controllerMiddleware,
    mysqlMiddleware,
    routesMiddleware,
    allowedMethodsMiddleware
);


const port: number = process.env.PORT || config.app[process.env.NODE_ENV].port;
app.listen(port, () => {
    logger.trace(`🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});