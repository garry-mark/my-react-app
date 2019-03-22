export default class ErrorResult {
    public status: number = 500;
    public code: string = '';
    public message: string = '';
    public errors: Array<any> | undefined;

    constructor(options: any) {
        this.code = options.code;
        this.status = options.status;
        this.message = options.message;
        this.errors = options.errors;
    }
}