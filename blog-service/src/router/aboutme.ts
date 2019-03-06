import * as Router from 'koa-router';

export default (app: any) => {
  const router = new Router({ prefix: '/aboutme' });
  const ctrl = app.controllers.UserController;
  router
    .get('/', ctrl.getBloggerInfo);

  return {
    routesMiddleware: router.routes()
  }
};