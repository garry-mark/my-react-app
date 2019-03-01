"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var aboutme_1 = require("./aboutme");
var article_1 = require("./article");
var router = new Router({ prefix: '/api' });
router.use(aboutme_1.default.routes(), aboutme_1.default.allowedMethods());
router.use(article_1.default.routes(), article_1.default.allowedMethods());
exports.default = router;
