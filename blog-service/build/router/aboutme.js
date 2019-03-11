"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
exports.default = (function (app) {
    var router = new Router({ prefix: '/aboutme' });
    var ctrl = app.controllers.UserController;
    router
        .get('/', ctrl.getBloggerInfo);
    return {
        routesMiddleware: router.routes()
    };
});
