import * as Koa from 'koa';

import Controller from '../controller/Controller';

import { Logger } from 'log4js';

interface Controllers<Controller> {
    [name: string]: Controller;
}

export default interface MyKoa extends Koa {
    controllers?: Controllers<Controller>;
    logger?: Logger;
}