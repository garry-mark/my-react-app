import * as Router from 'koa-router';
const router = new Router({ prefix: '/article' });

router.get('/:id', (ctx: any) => {
	ctx.body = {
		name: 'Chikara Chan',
		gender: 'male',
		age: 21
	};
});

export default router;
