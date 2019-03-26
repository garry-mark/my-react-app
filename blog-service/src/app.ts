import * as Koa from 'koa';

import * as log4js from 'log4js';

import * as config from './../app.config';

import uncaughtExceptionEventRegister from './core/register/uncaughtExceptionEventRegister';
import loggerRegister from './core/register/loggerRegister';
import validateRegister from './core/register/validateRegister';
import mysqlRegister from './core/register/mysqlRegister';
import httpClientRegister from './core/register/httpClientRegister';
import controllerRegister from './core/register/controllerRegister';
import middlewareRegister from './core/register/middlewareRegister';

import CORSRegister from './core/register/CORSRegister';

import MyKoa from './core/typing/MyKoa';

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
const CORSMiddleware = CORSRegister(app);

// const  = routerRegister(app);

middlewareRegister(
    app,
    loggerMiddleware,
    validateMiddleware,
    mysqlMiddleware,
    httpClientMiddleware,
    controllerMiddleware,
    CORSMiddleware,
    routesMiddleware,
    allowedMethodsMiddleware
);

const port: number = process.env.PORT || app.config.port;

app.listen(port, () => {
    logger.trace(`🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});
