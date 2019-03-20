
interface RouteDecoratorOptions {
    beforeMiddleware?: Function[];
    path: string;
    methods?: string;
    queryRules?: any;
    bodyRules?: any;
    paramsRules?: any;
}

export default function Route({ beforeMiddleware = [], path, methods = 'get', queryRules, bodyRules, paramsRules }: RouteDecoratorOptions) {
    return function (prototype: any, name: any, descriptor: any): void {

        if (!prototype.routes) {
            prototype.routes = [];
        }

        prototype.routes.push({
            name,
            path,
            methods,
            queryRules, bodyRules, paramsRules,
            beforeMiddleware
        })

    }
}
