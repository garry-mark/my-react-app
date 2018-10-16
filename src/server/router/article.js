const Router = require('koa-router');
const router = new Router();

router.all('/article', (ctx, next) => {
	ctx.body = 'article';
});

module.exports = router.routes();
