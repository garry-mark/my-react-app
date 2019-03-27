import { Context } from 'koa';

import { SubService } from './Service'

interface Services {
    [name: string]: SubService;
}

export default class Controller {
    protected _ctx?: Context;
    public services: Services = {};

    public get ctx(): Context | undefined {
        return this._ctx;
    }

    public set ctx(ctx: Context | undefined) {
        this._ctx = ctx;
    }
}