import * as Router from 'koa-router';
const router = new Router({ prefix: '/article' });

router.get('/:id', (ctx: any) => {
  ctx.body = {
    id: 1,
    category: { id: 1, name: 'JS' },
    title: 'Hello world',
    content: 'Hello world',
    pageview: 2,
    like: 11,
    createTime: Date.now(),
    updateTime: Date.now()
  };
});

export default router;
