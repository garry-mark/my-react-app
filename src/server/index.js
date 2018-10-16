const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');

const ssrMiddleware = require('./middleware/serverSideRender');

const routes = require('./router/');

const app = new Koa();
const router = new Router();

const staticPath = '../../dist';
app.use(static(path.join(__dirname, staticPath)));

// routes for '/api/*'
app.use(routes);

router.get('/*', ssrMiddleware);

app.use(router.routes());

app.listen(3000);
