import { Context } from 'Koa';

export default async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (e) {
    ctx.logger.error(e);
    ctx.body = {
      code: 500,
      content: e,
    }
  }
};