import * as log4js from 'log4js';

const logger = log4js.getLogger('OPERATION');

export default (options?: any) => {
  // handle node error
  process.on('uncaughtException', (err: Error) => {
    logger.error(err);
  });

  // handle koa Middleware Error
  return async (ctx: any, next: any) => {
    try {
      await next();
    } catch (e) {
      logger.error(e);
    }
  };
};