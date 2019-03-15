"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
exports.default = (function (app) {
    var router = new Router({ prefix: '/article' });
    var ctrl = app.controllers.ArticleController;
    router
        .get('/paging', ctrl.getArticlePaging.bind(ctrl))
        .get('/:id', ctrl.getArticleById.bind(ctrl));
    return {
        routesMiddleware: router.routes()
    };
});
