import Service from "../core/model/Service";


export default class UserService extends Service {


    public async getBloggerInfo() {
        const { mysql } = this.ctx!;
        const sql = mysql.format('SELECT id, username, password, tel_num as telNum, email, avatar, create_time as createTime FROM user WHERE role=?', [1]);
        this.ctx!.logger.debug(sql);
        const [[data]] = await mysql.query(sql);

        return data
    }

    public async register() { }

    public async login() { }
}
