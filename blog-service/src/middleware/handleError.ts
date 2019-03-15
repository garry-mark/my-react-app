import { Context } from 'Koa';

export default async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (e) {
    ctx.logger.error(e);

    let error = {
      status: e.status || 500,
      code: e.code || '',
      message: e.message || '',
      errors: e.errors || undefined,
    };

    ctx.body = error
  }
};