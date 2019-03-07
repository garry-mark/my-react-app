import { Context } from 'koa';

export interface SubService extends Service {
    [name: string]: any;
}

export default class Service {
    protected _ctx?: Context;

    public get ctx(): Context | undefined {
        return this._ctx;
    }

    public set ctx(ctx: Context | undefined) {
        this._ctx = ctx;
    }
}