import { Context } from "koa";
import MyKoa from "../typing/MyKoa";

export default (app: MyKoa) => async (ctx: Context, next: Function) => {

    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

    await next();
}