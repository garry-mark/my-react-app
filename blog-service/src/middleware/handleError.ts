import * as log4js from 'log4js';
import { Context } from 'Koa';
const logger = log4js.getLogger('OPERATION');

export default async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (e) {
    logger.error(e);
  }
};