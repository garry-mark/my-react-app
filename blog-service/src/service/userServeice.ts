import Service from "./Service";


export default class UserServeice extends Service {
    public async getBloggerInfo() {
        // console.log(await this.ctx!.mysql.query('SELECT * FROM user'));
        console.log(await this.ctx!.curl('http://www.baidu.com'));
        const data = await this.ctx!.curl('http://www.baidu.com');
        return data;
    }
    public async register() { }
    public async login() { }
}
