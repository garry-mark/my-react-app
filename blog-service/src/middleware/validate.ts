import { Context } from 'Koa';

export default (rules: any) => async (ctx: Context, next: Function) => {
    ctx!.validate(rules);
    await next();
};