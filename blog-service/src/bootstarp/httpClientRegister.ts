import { create, HttpClient, RequestOptions } from 'urllib';
import * as Koa from 'koa';

export default (app?: Koa, options?: RequestOptions) => {
    const hc: HttpClient = create(options);
    return async (ctx: Koa.Context, next: Function) => {
        ctx.curl = hc.curl.bind(hc);
        await next();
    }
};