import { Context } from 'koa';
import * as log4js from 'log4js';
import MyKoa from '../typing/MyKoa';


export default (app: MyKoa, options = { level: 'info' }) => {
    // set log4js config
    log4js.configure(app.config.log4jsConfig);

    const accessLogger = log4js.getLogger('ACCESS');
    const operationLogger = log4js.getLogger('OPERATION');
    const fn = log4js.connectLogger(accessLogger, options);

    return async (ctx: Context, next: Function) => {
        ctx.logger = operationLogger;
        await next();
        await new Promise((resolve, reject) => {
            fn(ctx.req, ctx.res, (err: Error) => (err ? reject(err) : resolve(ctx)));
        });

    };
};
