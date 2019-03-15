import * as Router from 'koa-router';
import validateMiddleware from '../middleware/validate'

export default (app: any) => {
  const router = new Router({ prefix: '/article' });
  const ctrl = app.controllers.ArticleController
  router
    .get('/paging', ctrl.getArticlePaging.bind(ctrl))
    .get('/:id', validateMiddleware({
      id: {
        type: 'int',
        convertType: 'int'
      }
    }), ctrl.getArticleById.bind(ctrl));

  return {
    routesMiddleware: router.routes()
  }
};