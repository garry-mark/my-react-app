import * as log4js from 'log4js';

const logger = log4js.getLogger('OPERATION');

export default () => {
    // handle node error
    process.on('uncaughtException', (err: Error) => {
        logger.error(err);
    });
}
