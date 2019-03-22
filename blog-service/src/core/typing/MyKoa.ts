import * as Koa from 'koa';

import Controller from '../model/Controller';

import { Logger } from 'log4js';

interface Controllers<Controller> {
    [name: string]: Controller;
}

export default interface MyKoa extends Koa {
    controllers?: Controllers<Controller>;
    router?: any;
    logger?: Logger;
    config?: any;
    validator?: any;
    routerMiddlewares?: any;
}