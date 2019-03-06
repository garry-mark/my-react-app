import * as Router from 'koa-router';

export default (app: any) => {
  const router = new Router({ prefix: '/article' });
  const ctrl = app.controllers.ArticleController
  router
    .get('/paging', ctrl.getArticlePaging)
    .get('/:id', ctrl.getArticleById);

  return {
    routesMiddleware: router.routes()
  }
};