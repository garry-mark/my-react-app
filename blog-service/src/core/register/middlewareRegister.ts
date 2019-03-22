import * as Koa from 'koa';

import handleErrorMiddleware from '../middleware/handleError';
import MyKoa from '../typing/MyKoa';


export default (app: MyKoa, ...middlewareArr: any): Koa => {

    app.use(handleErrorMiddleware);

    const middlewareArrLen = middlewareArr.length;
    for (let i = 0; i < middlewareArrLen; i++) {
        app.use(middlewareArr[i]);
    }

    return app;
}