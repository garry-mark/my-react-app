import 'babel-polyfill';

import * as path from 'path';

import * as Koa from 'koa';
import * as KoaStatic from 'koa-static';
import * as views from 'koa-views';
import ssrMiddleware from './middleware/serverSideRender';

import apiRoutes from './router/';

const app = new Koa();

const staticPath = '../../dist';
app.use(KoaStatic(path.join(__dirname, staticPath)));

// apiRfor '/api/*'
app.use(apiRoutes.routes());

app.use(views(path.resolve(__dirname, '../views'), { map: { html: 'ejs' } }));

app.use(ssrMiddleware);

export default app;
