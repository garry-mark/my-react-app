import Service from "../core/model/Service";
// 映入相关的模型
import CategoryVO from '../model/vo/CategoryVO';

// 主要是考虑整个项目的数据源都是DB，所以只选择实现CategoryService，而没有进一步抽象
// 在多数据源的项目下可用抽象出CategoryService接口，实现不同的Service,类似下面写法
// class CategoryDBService extends Service implements CategoryService
export default class CategoryService extends Service {

    // 相关业务操作
    public async getCategoryList(): Promise<Array<CategoryVO> | null> {
        // 在上下文（web容器）中获取mysql连接池和日志打印器
        const { mysql, logger } = this.ctx!;

        // 对sql进行转义，防止sql注入等攻击
        const sql = mysql.format(`SELECT id, name FROM category`);
        logger.debug(sql);
        // 进行sql操作
        const [data] = await mysql.query(sql);
        // 记录操作日志
        logger.debug(data);

        return data;
    }

    public async createCategory(category: CategoryVO): Promise<number | null> {
        const { name } = category;
        const { mysql, logger } = this.ctx!;

        const sql = mysql.format('INSERT INTO category ( name ) VALUES ( ? );', [name]);
        logger.debug(sql);
        const result = await mysql.query(sql);
        logger.debug(result);
        const [{ insertId }] = result;

        return insertId;
    }

    public async hasArticleMapping(id: number): Promise<boolean | null> {
        if (id <= 0) {
            return false;
        }
        const { mysql, logger } = this.ctx!;
        const sql = mysql.format('SELECT id FROM map_article_category WHERE cid=?', [id]);
        logger.debug(sql);
        const [data] = await mysql.query(sql);
        logger.debug(data);

        return data.length > 0;
    }

    public async deleteCategory(id: number): Promise<number | null> {
        const { mysql, logger } = this.ctx!;

        // 在连接池中获取连接以及开启事务
        const conn = await mysql.getConnection();
        await conn.beginTransaction();
        try {
            const aSql = conn.format('DELETE FROM category WHERE id=? ', [id]);
            logger.debug(aSql);
            const result = await conn.query(aSql);
            logger.debug(result);
            const [{ affectedRows: aAffectedRows }] = result;

            if (await this.hasArticleMapping(id)) {
                const mSql = conn.format('UPDATE map_article_category SET cid=? WHERE cid=? ', [null, id]);
                logger.debug(mSql);
                const mResult = await conn.query(mSql);
                logger.debug(mResult);
                const [{ changedRows: mChangedRows }] = mResult;

                if (!mChangedRows) {
                    // 事务回滚
                    await conn.rollback();
                }
            }
            // 事务提交
            await conn.commit();

            return aAffectedRows;
        } finally {
            // 释放链接
            conn.release();
        }
    }

    public async updateCategory(category: CategoryVO): Promise<number | null> {
        const { id, name } = category;
        const { mysql, logger } = this.ctx!;

        const aSql = mysql.format('UPDATE category SET name=? WHERE id=? ', [name, id]);
        logger.debug(aSql);
        const aResult = await mysql.query(aSql);
        logger.debug(aResult);
        const [{ changedRows: aChangedRows }] = aResult;

        return aChangedRows;

    }
}
