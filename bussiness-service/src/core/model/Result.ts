import { ResultCode } from "../enum";

export default class Result {
    public message: string | undefined;
    public data: any;
    public error: Array<any> | undefined;
    public code: ResultCode;

    constructor(options: any) {
        this.message = options.message || undefined;
        this.code = options.code || ResultCode.SUCCESS;
        this.data = options.data || undefined;
        this.error = options.error || undefined;
    }
}