"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
exports.default = (function (app) {
    var router = new Router({ prefix: '/article' });
    var ctrl = app.controllers.ArticleController;
    router
        .get('/paging', ctrl.getArticlePaging)
        .get('/:id', ctrl.getArticleById);
    return {
        routesMiddleware: router.routes()
    };
});
