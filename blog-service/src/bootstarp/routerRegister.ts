import * as Koa from 'koa';
import * as Router from 'koa-router';

import AboutemeRouter from '../router/aboutme';
import ArticleRouter from '../router/article';



export default (app: Koa) => {
    const router = new Router({ prefix: '/api' });
    const { routesMiddleware: aboutemeroutesMiddleware } = AboutemeRouter(app);
    const { routesMiddleware: articleroutesMiddleware } = ArticleRouter(app);

    router.use(aboutemeroutesMiddleware);
    router.use(articleroutesMiddleware);

    return {
        routesMiddleware: router.routes(),
        allowedMethodsMiddleware: router.allowedMethods()
    }
};
