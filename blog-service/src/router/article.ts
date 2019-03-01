import * as Router from 'koa-router';
const router = new Router({ prefix: '/article' });

// /:id will handle by /paging before
router.get('/paging', (ctx: any) => {
  ctx.body = {
    list: [
      {
        id: 1,
        category: { id: 1, name: 'JS' },
        title: 'Hello world',
        content: 'Hello world',
        pageview: 2,
        like: 11,
        createTime: Date.now(),
        updateTime: Date.now()
      },
      {
        id: 2,
        category: { id: 1, name: 'JS' },
        title: 'Hello world agained',
        content: 'Hello world agained',
        pageview: 99,
        like: 23,
        createTime: Date.now(),
        updateTime: Date.now()
      }
    ]
  };
});

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
