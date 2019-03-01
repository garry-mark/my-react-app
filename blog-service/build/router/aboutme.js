"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var router = new Router({ prefix: '/aboutme' });
router.get('/', function (ctx) {
    ctx.body = {
        avatar: 'https://via.placeholder.com/400x400',
        birthday: '1994-12-31',
        chineseName: '麦健荣',
        company: 'Chinatelecom',
        degree: 'Computer',
        email: '763224334@qq.com',
        firstName: 'Mark',
        hobby: [
            'bodybuilding',
            'swimming',
            'cooking',
            'surfing internet',
            'watching movie'
        ],
        jobTitle: 'Front-end engineer',
        lastName: 'Garry'
    };
});
exports.default = router;
