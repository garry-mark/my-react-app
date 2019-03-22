import { Context } from 'Koa';
import ErrorResult from '../model/ErrorResult';

export default async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (e) {
    ctx.logger.error(e);

    ctx.body = new ErrorResult(e);
  }
};