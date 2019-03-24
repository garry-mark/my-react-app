import Service from "../core/model/Service";

import ArticleVO from '../model/vo/ArticleVO';
import camcel2UnderLine from '../core/utils/camcel2UnderLine';

export default class ArticleService extends Service {

    public async getPrevArticle(id: number): Promise<ArticleVO | null> {
        const { mysql, logger } = this.ctx!;
        const sql = mysql.format('SELECT id, title FROM article WHERE id<? ORDER BY id DESC LIMIT 1 ', [id]);
        logger.debug(sql);
        const [[data]] = await mysql.query(sql);
        logger.debug(data);

        return data || null;
    }

    public async getNextArticle(id: number): Promise<ArticleVO | null> {
        const { mysql, logger } = this.ctx!;
        const sql = mysql.format('SELECT id, title FROM article WHERE id>? LIMIT 1', [id]);
        logger.debug(sql);
        const [[data]] = await mysql.query(sql);
        logger.debug(data);

        return data || null;
    }

    public async getArticleById(id: number): Promise<ArticleVO | null> {
        const { mysql, logger } = this.ctx!;
        const prevArticle = await this.getPrevArticle(id);
        const nextArticle = await this.getNextArticle(id);

        const conn = await mysql.getConnection();
        await conn.beginTransaction();
        try {
            const qSql = conn.format('SELECT id, title, banner, content, `like`, page_view as pageView, origin_type as originType, origin_url as originUrl, origin_name as originName, create_time as createTime,  update_time as updateTime  FROM article WHERE id=?', [id]);
            logger.debug(qSql);
            const [[data]] = await conn.query(qSql);
            logger.debug(data);

            const { pageView } = data;
            const mSql = conn.format('UPDATE article SET page_view=? WHERE id=? ', [pageView + 1, id]);
            logger.debug(mSql);
            const mResult = await conn.query(mSql);
            logger.debug(mResult);
            const [{ changedRows: mChangedRows }] = mResult;

            if (mChangedRows) {
                await conn.commit();
            } else {
                await conn.rollback();
            }

            return data ? {
                ...data,
                prev: prevArticle,
                next: nextArticle
            } : null;
        } finally {
            conn.release();
        }

    }

    public async getArticlePaging({ pageNum, pageSize, keyword, categoryId, orderBy }): Promise<Array<ArticleVO> | null> {
        const { mysql, logger } = this.ctx!;

        if (keyword) {
            keyword = `%${keyword}%`;
        }
        const keywordSql = keyword && mysql.format(`title LIKE ? AND content LIKE ?`, [keyword, keyword]);
        const categoryIdSql = categoryId ? mysql.format(`c.id = ?`, [categoryId]) : '';

        orderBy = orderBy ? camcel2UnderLine(orderBy) : 'create_time';
        const oderBySql = mysql.format(`?? DESC`, [orderBy]);

        const limitSql = pageNum !== 0 && pageSize !== 0 ? mysql.format('LIMIT ? OFFSET ?', [pageSize, (pageNum - 1) * pageSize]) : '';

        const sql = mysql.format(`
            SELECT
                a.id, a.title, a.banner, a.\`like\`,
                a.page_view as pageView,
                a.origin_type as originType,
                a.create_time as createTime,
                a.update_time as updateTime,
                c.name as categoryName
            FROM
                article a
            LEFT JOIN
                map_article_category m
                ON a.id = m.aid
            LEFT JOIN
                category c
                ON m.cid = c.id
            ${keywordSql || categoryIdSql ? 'WHERE' : ''}
                ${keywordSql}
                ${keywordSql && categoryIdSql ? ' AND ' + categoryIdSql : categoryIdSql}
            ORDER BY
                ${oderBySql}
            ${limitSql}`);
        logger.debug(sql);
        const [data] = await mysql.query(sql);
        logger.debug(data);

        return data;
    }

    public async createArticle(article: ArticleVO): Promise<number | null> {
        const { title, banner, content, originType, originUrl, originName, categoryId } = article;
        const { mysql, logger } = this.ctx!;

        const conn = await mysql.getConnection();
        await conn.beginTransaction();
        try {
            const aSql = conn.format('INSERT INTO article ( title, banner, content, origin_type, origin_url, origin_name ) VALUES ( ?,?,?,?,?,? );', [title, banner, content, originType, originUrl, originName]);
            logger.debug(aSql);
            const aResult = await conn.query(aSql);
            logger.debug(aResult);
            const [{ insertId: aInsertId }] = aResult;

            const mSql = conn.format('INSERT INTO map_article_category ( aid,cid ) VALUES ( ?,? );', [aInsertId, categoryId]);
            logger.debug(mSql);
            const mResult = await conn.query(mSql);
            logger.debug(mResult);
            const [{ insertId: mInsertId }] = mResult;

            if (mInsertId) {
                await conn.commit();
            } else {
                await conn.rollback();
            }
            return aInsertId;
        } finally {
            conn.release();
        }
    }

    public async hasArticle(id: number): Promise<boolean | null> {
        if (id <= 0) {
            return false;
        }
        const { mysql, logger } = this.ctx!;
        const sql = mysql.format('SELECT id FROM article WHERE id=?', [id]);
        logger.debug(sql);
        const [data] = await mysql.query(sql);
        logger.debug(data);

        return data.length > 0;
    }

    public async deleteArticle(id: number): Promise<number | null> {
        const { mysql, logger } = this.ctx!;

        const conn = await mysql.getConnection();
        await conn.beginTransaction();
        try {
            const aSql = conn.format('DELETE FROM article WHERE id=? ', [id]);
            logger.debug(aSql);
            const result = await conn.query(aSql);
            logger.debug(result);
            const [{ affectedRows: aAffectedRows }] = result;

            const mSql = conn.format('DELETE FROM map_article_category WHERE aid=? ', [id]);
            logger.debug(mSql);
            const mResult = await conn.query(mSql);
            logger.debug(mResult);
            const [{ affectedRows: mAffectedRows }] = mResult;

            if (mAffectedRows) {
                await conn.commit();
            } else {
                await conn.rollback();
            }
            return aAffectedRows;
        } finally {
            conn.release();
        }
    }

    public async updateArticle(article: ArticleVO): Promise<number | null> {
        const { title, banner, content, originType, originUrl, originName, id, categoryId } = article;
        const { mysql, logger } = this.ctx!;

        const conn = await mysql.getConnection();
        await conn.beginTransaction();
        try {
            const aSql = conn.format('UPDATE article SET title=?,banner=?,content=?,origin_type=?,origin_url=?,origin_name=? WHERE id=? ', [title, banner, content, originType, originUrl, originName, id]);
            logger.debug(aSql);
            const aResult = await conn.query(aSql);
            logger.debug(aResult);
            const [{ changedRows: aChangedRows }] = aResult;

            const mSql = conn.format('UPDATE map_article_category SET cid=? WHERE aid=? ', [categoryId, id]);
            logger.debug(mSql);
            const mResult = await conn.query(mSql);
            logger.debug(mResult);
            const [{ changedRows: mChangedRows }] = mResult;

            if (mChangedRows) {
                await conn.commit();
            } else {
                await conn.rollback();
            }
            return aChangedRows;
        } finally {
            conn.release();
        }
    }
}
