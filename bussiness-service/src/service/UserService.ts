import Service from "../core/model/Service";
import UserVO from "../model/vo/UserVO";


export default class UserService extends Service {


    public async getBloggerInfo(): Promise<UserVO | null> {
        const { mysql, logger } = this.ctx!;
        const sql = mysql.format('SELECT username, tel_num as telNum, email, avatar, create_time as createTime FROM user WHERE role=?;', [1]);
        logger.debug(sql);
        const [[data]] = await mysql.query(sql);
        logger.debug(data);

        return data;
    }

    public async deleteUser(id: number): Promise<UserVO | null> {
        const { mysql, logger } = this.ctx!;
        const sql = mysql.format('DELETE FROM user WHERE id=?;', [id]);
        logger.debug(sql);
        const result = await mysql.query(sql);
        logger.debug(result);
        const [{ affectedRows }] = result;

        return affectedRows;
    }

    public async updateUser(userVO: UserVO): Promise<number | null> {
        const { mysql, logger } = this.ctx!;
        const { username, telNum, email, avatar, id } = userVO;
        const sql = mysql.format('UPDATE user SET username=?, tel_num=?, email=?, avatar=? WHERE id=?;', [username, telNum, email, avatar, id]);
        logger.debug(sql);
        const result = await mysql.query(sql);
        logger.debug(result);
        const [{ changedRows: mChangedRows }] = result;

        return mChangedRows;
    }

    public async resetPassword(userVO: UserVO): Promise<number | null> { return null; }

    public async register(userVO: UserVO): Promise<number | null> {
        const { mysql, logger } = this.ctx!;
        const { username, password, telNum, email, avatar } = userVO;

        // username is exist
        if (await this.hasUser(username)) return -1;

        const sql = mysql.format('INSERT INTO user (  username, password, tel_num, email, avatar ) VALUES ( ?,?,?,?,? );', [username, password, telNum, email, avatar]);
        logger.debug(sql);
        const result = await mysql.query(sql);
        logger.debug(result);
        const [{ insertId }] = result;

        return insertId;
    }

    public async hasUser(username: string): Promise<boolean | null> {
        if (!username) {
            return false;
        }
        const { mysql, logger } = this.ctx!;
        const sql = mysql.format('SELECT id FROM user WHERE username=?', [username]);
        logger.debug(sql);
        const [data] = await mysql.query(sql);
        logger.debug(data);

        return data.length > 0;
    }

    public async login(username: string, password: string): Promise<UserVO | number> {
        if (!await this.hasUser(username)) return -1;

        const { mysql, logger } = this.ctx!;
        const sql = mysql.format('SELECT id, password, username, tel_num as telNum, email, avatar FROM user WHERE username=?', [username]);
        logger.debug(sql);
        const [[data]] = await mysql.query(sql);
        logger.debug(data);

        if (data.password === password) {
            return data;
        } else {
            return -2;
        }
    }
}
