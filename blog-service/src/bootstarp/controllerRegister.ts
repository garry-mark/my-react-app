import { Context } from 'koa';
import * as KoaRouter from 'koa-router';
import * as fs from 'fs';
import * as path from 'path';
import MyKoa from '../typing/MyKoa';
import * as koaBodyparser from 'koa-bodyparser';

import validateMiddleware, { ArgType } from '../middleware/validate'

export default (app: MyKoa) => {
    const baseRouter = new KoaRouter({ prefix: app.config.baseURL });
    const controllers = app.controllers = {};
    const router = app.router = {};
    const ctrlDirPath = path.resolve(__dirname, '../controller')
    const ctrlFileNameArr = fs.readdirSync(ctrlDirPath).filter(filename => /^[A-Z]{1}[\w|\d]*Controller[.test]?.[t|j]s$/.test(filename));
    app.logger!.debug(ctrlDirPath);
    app.logger!.debug(ctrlFileNameArr);

    const ctrlFileNameArrLen = ctrlFileNameArr.length;
    for (let i = ctrlFileNameArrLen - 1; i >= 0; i--) {
        const ctrlFinFileName = path.join(ctrlDirPath, ctrlFileNameArr[i]);
        app.logger!.debug(ctrlFinFileName);
        try {
            const ctrlModule = require(ctrlFinFileName);
            const ctrl = ctrlModule.default;
            const ctrlName = ctrl.name;
            controllers[ctrlName] = new ctrl();
            controllers[ctrlName].services = ctrl.services;
            if (ctrl.router) {
                const routerMiddleware = genRouterMiddleware(ctrl.router, controllers[ctrlName], app.config.bodyParserOptions);
                routerMiddleware && baseRouter.use(routerMiddleware);
            }
        } catch (e) {
            app.logger!.error(e);
        }
    }

    // set ctx to Controller and Service instance
    return {
        routesMiddleware: baseRouter.routes(),
        allowedMethodsMiddleware: baseRouter.allowedMethods(),
        controllerMiddleware: _controllerMiddleware({ router, controllers })
    }

}

function _controllerMiddleware({ router, controllers }) {
    return async (ctx: Context, next: Function) => {
        // set router to ctx for generate swagger-ui
        ctx.router = router;
        for (let ckey in controllers) {
            const someCtrl = controllers[ckey];
            // can filter some field before setting. eg. mysql
            someCtrl.ctx = ctx;
            const services = someCtrl.services;
            for (let skey in services) {
                // can filter some field before setting
                someCtrl.services[skey].ctx = ctx;
            }
        }
        await next();
    };
}


function genRouterMiddleware({ prefix, routes }, context: any, initBodyParserOptions?: any) {
    const koaRouter = new KoaRouter({ prefix });
    const prototype = Object.getPrototypeOf(context);
    for (let route of routes) {
        const { name, path, methods, queryRules, bodyRules,
            bodyParserOptions,
            paramsRules, beforeMiddleware } = route;
        const action = prototype[name].bind(context);

        bodyRules && beforeMiddleware.push(validateMiddleware(bodyRules, ArgType.BODY));
        queryRules && beforeMiddleware.push(validateMiddleware(queryRules, ArgType.QUERY));
        paramsRules && beforeMiddleware.push(validateMiddleware(paramsRules, ArgType.PARAMS));

        if (methods === 'post' || methods === 'put' || methods === 'update') {
            let magerBodyParserOptions = Object.assign(initBodyParserOptions, bodyParserOptions);
            beforeMiddleware.unshift(koaBodyparser(magerBodyParserOptions));
        }

        koaRouter[methods](name, path, ...beforeMiddleware.concat(action));
    }

    return koaRouter.routes();
}