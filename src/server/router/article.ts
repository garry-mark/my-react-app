import * as Router from 'koa-router';
const router = new Router({ prefix: '/article' });

router.get('/:id', (ctx: any) => {
	ctx.body = `article id is ${ctx.params.id}`;
});

export default router;
