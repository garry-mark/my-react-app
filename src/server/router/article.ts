import * as Router from 'koa-router';
const router = new Router();

router.all('/article', (ctx: any) => {
	ctx.body = 'article';
});

export default router.routes();
