import * as Koa from 'koa';

import log4jMiddleware from '../middleware/log4j';

import handleErrorMiddleware from '../middleware/handleError';

import poolMiddleware, { getPool } from '../middleware/mysqlBootstrap';

import apiRoutes from '../router';

export default (app: Koa, ...middlewareArr: Array<Koa.Middleware<Koa.ParameterizedContext<any, {}>>>) => {

    const middlewareArrLen = middlewareArr.length;
    for (let i = 0; i < middlewareArrLen; i++) {
        app.use(middlewareArr[i]);
    }



    app.use(handleErrorMiddleware());
    app.use(log4jMiddleware());
    app.use(poolMiddleware(getPool()));

    // set controller for routesMiddleware
    const { routesMiddleware, allowedMethodsMiddleware } = apiRoutes(app);
    // ApiMiddleware handle for '/api/*'
    app.use(routesMiddleware).use(allowedMethodsMiddleware);

    return app;
}