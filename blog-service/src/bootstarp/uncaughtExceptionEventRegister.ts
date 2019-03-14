import MyKoa from '../typing/MyKoa';

export default (app: MyKoa) => {
    // handle node error
    process.on('uncaughtException', (err: Error) => {
        app.logger!.error(err);
    });
}
