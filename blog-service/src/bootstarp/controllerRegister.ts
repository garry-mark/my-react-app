import { Context } from 'koa';
import * as fs from 'fs';
import * as path from 'path';
import * as log4js from 'log4js';
import MyKoa from '../typing/MyKoa';

const logger = log4js.getLogger('registerController');

export default (app: MyKoa) => {
    const controllers = app.controllers = {};
    const ctrlDirPath = path.resolve(__dirname, '../controller')
    const ctrlFileNameArr = fs.readdirSync(ctrlDirPath).filter(filename => filename.match(/^[A-Z]{1}[\w|\d]*Controller[.test]?.[t|j]s$/));
    logger.debug(ctrlDirPath);
    logger.debug(ctrlFileNameArr);

    const ctrlFileNameArrLen = ctrlFileNameArr.length;
    for (let i = ctrlFileNameArrLen - 1; i >= 0; i--) {
        const ctrlFinFileName = path.join(ctrlDirPath, ctrlFileNameArr[i]);
        logger.debug(ctrlFinFileName);
        try {
            const ctrlModule = require(ctrlFinFileName);
            const ctrl = ctrlModule.default;
            const ctrlName = ctrl.name;
            controllers[ctrlName] = new ctrl();
            controllers[ctrlName].services = ctrl.services;
        } catch (e) {
            logger.error(e);
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