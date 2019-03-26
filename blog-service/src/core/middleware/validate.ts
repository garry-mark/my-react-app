import { Context } from 'koa';

export enum ArgType {
    BODY = 'body',
    PARAMS = 'params',
    QUERY = 'query'
}

export default (rules: any, argType: ArgType) => async (ctx: Context, next: Function) => {
    if (argType === ArgType.BODY) {
        ctx!.validate(rules, ctx!.request[argType]);
    } else {
        ctx!.validate(rules, ctx[argType]);
    }
    await next();
};