import { Context } from 'koa';
import { PoolConfig, Connection, } from 'mysql';

import * as mysql from 'mysql2';
import * as log4js from 'log4js';

import * as appConfig from '../../app.config.js';

const logger = log4js.getLogger();

export function getPool(config?: PoolConfig) {
    const pool = mysql.createPool(config || appConfig.app[process.env.NODE_ENV].dbConfig);

    pool.on('connection', (connection: Connection) => {
        logger.trace('📀  Connection %d connected', connection.threadId);
    });

    pool.on('acquire', (connection: Connection) => {
        logger.trace('📀  Connection %d acquired', connection.threadId);
    });

    pool.on('release', function (connection: Connection) {
        logger.trace('📀  Connection %d released', connection.threadId);
    });

    pool.on('enqueue', () => {
        logger.trace('📀  Waiting for available connection slot');
    });

    return pool;
}

export default (pool: any) => async (ctx: Context, next: Function) => {
    ctx.mysql = pool.promise();
    await next();
};