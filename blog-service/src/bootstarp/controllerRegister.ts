import { Context } from 'koa';
import * as KoaRouter from 'koa-router';
import * as fs from 'fs';
import * as path from 'path';
import MyKoa from '../typing/MyKoa';

import validateMiddleware from '../middleware/validate'

export default (app: MyKoa) => {
    const controllers = app.controllers = {};
    const routerMiddlewares: Array<Function> = app.routerMiddlewares = [];
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
                const routerMiddleware = genRouterMiddleware(ctrl.router, controllers[ctrlName]);
                routerMiddleware && routerMiddlewares.push(routerMiddleware);
            }
        } catch (e) {
            app.logger!.error(e);
        }
    }

    // set ctx to Controller and Service instance
    return async (ctx: Context, next: Function) => {
        const controllers = app.controllers
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

function genRouterMiddleware({ prefix, routes }, context: any) {
    const koaRouter = new KoaRouter({ prefix });
    const prototype = Object.getPrototypeOf(context);
    for (let route of routes) {
        const { name, path, methods, validatorRules, beforeMiddleware } = route;
        const action = prototype[name].bind(context);

        if (validatorRules) {
            beforeMiddleware.push(validateMiddleware(validatorRules));
            beforeMiddleware.push(action);
            koaRouter[methods](name, path, ...beforeMiddleware);
        } else {
            koaRouter[methods](name, path, action);
        }
    }

    return koaRouter.routes();
}