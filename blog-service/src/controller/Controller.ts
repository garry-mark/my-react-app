import { Context } from 'koa';

export interface SubControllerSignature {
    new(ctx: Context): Controller;
}

export default class Controller {
    protected _ctx?: Context;

    public get ctx(): Context | undefined {
        return this._ctx;
    }

    public set ctx(ctx: Context | undefined) {
        this._ctx = ctx;
    }
}