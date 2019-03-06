import * as Koa from 'koa';

import handleErrorMiddleware from '../middleware/handleError';


export default (app: Koa, ...middlewareArr: any): Koa => {

    app.use(handleErrorMiddleware);

    const middlewareArrLen = middlewareArr.length;
    for (let i = 0; i < middlewareArrLen; i++) {
        app.use(middlewareArr[i]);
    }

    return app;
}