import { Options } from 'koa-bodyparser';

interface RouteDecoratorOptions {
    beforeMiddleware?: Function[];
    path: string;
    methods?: string;
    queryRules?: any;
    bodyRules?: any;
    paramsRules?: any;
    bodyParserOptions?: Options;
}

export default function Route({ beforeMiddleware = [], path, methods = 'get', queryRules, bodyRules, paramsRules, bodyParserOptions }: RouteDecoratorOptions) {
    return function (prototype: any, name: any, descriptor: any): void {

        if (!prototype.routes) {
            prototype.routes = [];
        }

        prototype.routes.push({
            name,
            path,
            methods,
            bodyParserOptions,
            queryRules, bodyRules, paramsRules,
            beforeMiddleware
        })

    }
}
