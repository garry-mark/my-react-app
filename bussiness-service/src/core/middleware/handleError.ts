import { Context } from 'koa';
import Result from '../model/Result';
import { ResultCode } from '../enum';

export default async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (e) {
    ctx.logger.error(e);

    const error = process.env.NODE_ENV === 'development' ? e : undefined;

    ctx.body = new Result({
      code: ResultCode.FAIl,
      message: e.message,
      error
    });
  }
};