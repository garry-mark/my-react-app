import * as log4js from 'log4js';
import * as config from '../../../app.config';

// set log4js config
log4js.configure(config.app[process.env.NODE_ENV].log4jsConfig);

export default (options = { level: 'info' }) => {
  const accessLogger = log4js.getLogger('ACCESS');
  const operationLogger = log4js.getLogger('OPERATION');
  const fn = log4js.connectLogger(accessLogger, options);
  return async (ctx: any, next: any) => {
    ctx.logger = operationLogger;
    await next();
    await new Promise((resolve, reject) => {
      fn(ctx.req, ctx.res, (err: Error) => (err ? reject(err) : resolve(ctx)));
    });

  };
};
