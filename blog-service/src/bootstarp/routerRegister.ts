
import * as Router from 'koa-router';
import MyKoa from '../typing/MyKoa';

export default (app: MyKoa) => {
    const router = new Router({ prefix: '/api' });

    const routerMiddlewares = app.routerMiddlewares || [];

    if (routerMiddlewares.length !== 0) {
        for (let routerMiddleware of routerMiddlewares) {
            router.use(routerMiddleware);
        }
    }

    return {
        routesMiddleware: router.routes(),
        allowedMethodsMiddleware: router.allowedMethods()
    }
};
