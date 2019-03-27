import Service from "../core/model/Service";

import CategoryVO from '../model/vo/CategoryVO';

export default class CategoryService extends Service {

    public async getCategoryList(): Promise<Array<CategoryVO> | null> {
        const { mysql, logger } = this.ctx!;

        const sql = mysql.format(`SELECT id, name FROM category`);
        logger.debug(sql);
        const [data] = await mysql.query(sql);
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
                    await conn.rollback();
                }
            }
            await conn.commit();

            return aAffectedRows;
        } finally {
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
