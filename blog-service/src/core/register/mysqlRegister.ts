import { Context } from 'koa';
import { PoolConfig, Connection, } from 'mysql';

import * as mysql from 'mysql2';

import MyKoa from '../typing/MyKoa.js';


export default (app: MyKoa, config?: PoolConfig) => {
    const pool = mysql.createPool(config || app.config.dbConfig);

    pool.on('connection', (connection: Connection) => {
        app.logger!.trace('📀  Connection %d connected', connection.threadId);
    });

    pool.on('acquire', (connection: Connection) => {
        app.logger!.trace('📀  Connection %d acquired', connection.threadId);
    });

    pool.on('release', function (connection: Connection) {
        app.logger!.trace('📀  Connection %d released', connection.threadId);
    });

    pool.on('enqueue', () => {
        app.logger!.trace('📀  Waiting for available connection slot');
    });

    return async (ctx: Context, next: Function) => {
        ctx.mysql = pool.promise();
        await next();
    };
}