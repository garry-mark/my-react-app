import * as Koa from 'koa';

import * as log4js from 'log4js';

import * as config from './../app.config';

import uncaughtExceptionEventRegister from './bootstarp/uncaughtExceptionEventRegister';
import loggerRegister from './bootstarp/loggerRegister';
import validateRegister from './bootstarp/validateRegister';
import mysqlRegister from './bootstarp/mysqlRegister';
import httpClientRegister from './bootstarp/httpClientRegister';
import controllerRegister from './bootstarp/controllerRegister';
import middlewareRegister from './bootstarp/middlewareRegister';
import MyKoa from './typing/MyKoa';

const env = process.env.NODE_ENV;
const app: MyKoa = new Koa();
const logger = log4js.getLogger('APP');
app.logger = logger;
app.config = config.app[env];

uncaughtExceptionEventRegister(app);
const loggerMiddleware = loggerRegister(app);
const validateMiddleware = validateRegister(app);
const { routesMiddleware, allowedMethodsMiddleware, controllerMiddleware } = controllerRegister(app);
const mysqlMiddleware = mysqlRegister(app);
const httpClientMiddleware = httpClientRegister();
// const  = routerRegister(app);

middlewareRegister(
    app,
    loggerMiddleware,
    validateMiddleware,
    mysqlMiddleware,
    httpClientMiddleware,
    controllerMiddleware,
    routesMiddleware,
    allowedMethodsMiddleware
);

const port: number = process.env.PORT || app.config.port;

app.listen(port, () => {
    logger.trace(`🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});
