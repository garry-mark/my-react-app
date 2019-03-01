"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var log4js = require("log4js");
var config = require("../app.config");
var log4j_1 = require("./middleware/log4j");
var handleError_1 = require("./middleware/handleError");
var router_1 = require("./router/");
var logger = log4js.getLogger();
var port = process.env.PORT || config.app[process.env.NODE_ENV].port;
var app = new Koa();
app.use(handleError_1.default());
app.use(log4j_1.default());
// ApiMiddleware handle for '/api/*'
app.use(router_1.default.routes()).use(router_1.default.allowedMethods());
app.listen(port, function () {
    logger.trace("\n==> \uD83C\uDF0E  Listening on port " + port + ". Open up http://localhost:" + port + "/ in your browser.\n");
});
