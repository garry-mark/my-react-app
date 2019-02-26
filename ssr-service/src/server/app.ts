import * as path from 'path';

import * as Koa from 'koa';
import * as KoaStatic from 'koa-static';
import * as views from 'koa-views';

import * as logger from 'koa-logger';

import handleErrorMiddleware from './middleware/handleError';
import ssrMiddleware from './middleware/serverSideRender';

import apiRoutes from './router/';

const isProd = process.env.NODE_ENV === 'production';

const app = new Koa();

app.use(handleErrorMiddleware());

app.use(logger());

const staticPath = '../../dist/static';
app.use(KoaStatic(path.resolve(__dirname, staticPath), { index: false }));

const viewsPath = isProd ? '../../dist/static' : '../views';
app.use(views(path.resolve(__dirname, viewsPath), { map: { html: 'ejs' } }));

// ApiMiddleware handle for '/api/*'
app.use(apiRoutes.routes()).use(apiRoutes.allowedMethods());

// SSR middleware must handle res after ApiMiddleware because it dependence on it.
app.use(ssrMiddleware);

app.use((ctx, next) => {
  next();
});

export default app;
