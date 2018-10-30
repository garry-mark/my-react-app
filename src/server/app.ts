import 'babel-polyfill';

import * as path from 'path';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as KoaStatic from 'koa-static';

import ssrMiddleware from './middleware/serverSideRender';

// import routes from './router/';

const app = new Koa();
const router = new Router();

const staticPath = '../../dist';
app.use(KoaStatic(path.join(__dirname, staticPath)));

// routes for '/api/*'
// app.use(routes);

router.get('/*', ssrMiddleware);

app.use(router.routes());

export default app;
