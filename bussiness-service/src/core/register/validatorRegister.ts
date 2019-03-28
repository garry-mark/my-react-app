
import MyKoa from "../typing/MyKoa";
import { Context } from "koa";
import * as Parameter from 'parameter';

export default (app: MyKoa) => {
    const parameter = new Parameter(app.config!.validateConfig);

    app.validator = parameter;

    return async (ctx: Context, next: Function) => {
        ctx.validate = (rules: any, data: any) => {
            const errors = app.validator.validate(rules, data);
            if (errors) {
                ctx.throw(422, 'Validation Failed', {
                    errors,
                });
            }
        }
        await next();
    }
}