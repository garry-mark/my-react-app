"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var router = new Router({ prefix: '/article' });
// /:id will handle by /paging before
router.get('/paging', function (ctx) {
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
router.get('/:id', function (ctx) {
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
exports.default = router;
