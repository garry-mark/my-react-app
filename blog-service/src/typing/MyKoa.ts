import * as Koa from 'koa';

import Controller from '../controller/Controller';

interface Controllers<Controller> {
    [name: string]: Controller;
}

export default interface MyKoa extends Koa {
    controllers?: Controllers<Controller>;
}