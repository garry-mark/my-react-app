import Service from "./Service";


export default class UserServeice extends Service {
    public async getBloggerInfo() {
        // console.log(this.ctx!.mysql)
        // start

        // edn
        console.log(await this.ctx!.mysql.query('SELECT * FROM user'));
    }
    public async register() { }
    public async login() { }
}
