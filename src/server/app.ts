import 'babel-polyfill';

import * as path from 'path';

import * as Koa from 'koa';
import * as KoaStatic from 'koa-static';
import * as views from 'koa-views';

import * as logger from 'koa-logger';
import ssrMiddleware from './middleware/serverSideRender';

import apiRoutes from './router/';

const isProd = process.env.NODE_ENV === 'production';

const app = new Koa();

app.use(logger());

const staticPath = '../../dist';
app.use(KoaStatic(path.resolve(__dirname, staticPath)));

const viewsPath = isProd ? '../../dist/browser' : '../views';
app.use(views(path.resolve(__dirname, viewsPath), { map: { html: 'ejs' } }));

app.use(ssrMiddleware);

// apiRfor '/api/*'
app.use(apiRoutes.routes());
app.use(apiRoutes.allowedMethods());

export default app;
