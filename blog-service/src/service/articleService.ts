import Service from "../core/model/Service";

import ArticleVo from '../model/vo/ArticleVo';
import camcel2UnderLine from '../core/utils/camcel2UnderLine';

export default class ArticleService extends Service {

    public async getPrevArticle(id: number): Promise<ArticleVo | null> {
        const { mysql } = this.ctx!;
        const sql = mysql.format('SELECT id, title FROM article WHERE id<? ORDER BY id DESC LIMIT 1 ', [id]);
        this.ctx!.logger.debug(sql);
        const [[data]] = await mysql.query(sql);
        this.ctx!.logger.debug(data);

        return data || null;
    }

    public async getNextArticle(id: number): Promise<ArticleVo | null> {
        const { mysql } = this.ctx!;
        const sql = mysql.format('SELECT id, title FROM article WHERE id>? LIMIT 1', [id]);
        this.ctx!.logger.debug(sql);
        const [[data]] = await mysql.query(sql);
        this.ctx!.logger.debug(data);

        return data || null;
    }

    public async getArticleById(id: number): Promise<ArticleVo | null> {
        const prevArticle = await this.getPrevArticle(id);
        const nextArticle = await this.getNextArticle(id);
        const { mysql } = this.ctx!;
        const sql = mysql.format('SELECT id, title, banner, content, `like`, page_view as pageView, origin_type as originType, origin_url as originUrl, origin_name as originName, create_time as createTime,  update_time as updateTime  FROM article WHERE id=?', [id]);
        this.ctx!.logger.debug(sql);
        const [[data]] = await mysql.query(sql);
        this.ctx!.logger.debug(data);
        return data ? {
            ...data,
            prev: prevArticle,
            next: nextArticle
        } : null;
    }

    public async getArticlePaging({ pageNum, pageSize, keyword, categoryId, orderBy }): Promise<Array<ArticleVo> | null> {
        const { mysql } = this.ctx!;

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
        this.ctx!.logger.debug(sql);
        const [data] = await mysql.query(sql);
        this.ctx!.logger.debug(data);

        return data;
    }

    public async createArticle(article: ArticleVo): Promise<number | null> {
        const { title, banner, content, originType, originUrl, originName } = article;
        const { mysql } = this.ctx!;
        const sql = mysql.format('INSERT INTO article ( title, banner, content, origin_type, origin_url, origin_name ) VALUES ( ?,?,?,?,?,? );', [title, banner, content, originType, originUrl, originName]);
        this.ctx!.logger.debug(sql);
        const result = await mysql.query(sql);
        this.ctx!.logger.debug(result);
        const [{ insertId }] = result;
        return insertId;
    }

    public async hasArticle(id: number): Promise<boolean | null> {
        if (id <= 0) {
            return false;
        }
        const { mysql } = this.ctx!;
        const sql = mysql.format('SELECT id FROM article WHERE id=?', [id]);
        this.ctx!.logger.debug(sql);
        const [data] = await mysql.query(sql);
        this.ctx!.logger.debug(data);

        return data.length > 0;
    }

    public async deleteArticle(id: number): Promise<number | null> {
        const { mysql } = this.ctx!;
        const sql = mysql.format('DELETE FROM article WHERE id=? ', [id]);
        this.ctx!.logger.debug(sql);
        const result = await mysql.query(sql);
        this.ctx!.logger.debug(result);
        const [{ affectedRows }] = result;
        return affectedRows;
    }

    public async updateArticle(article: ArticleVo): Promise<number | null> {
        const { title, banner, content, originType, originUrl, originName, id = -1 } = article;

        const { mysql } = this.ctx!;
        const sql = mysql.format('UPDATE article SET title=?,banner=?,content=?,origin_type=?,origin_url=?,origin_name=? WHERE id=? ', [title, banner, content, originType, originUrl, originName, id]);
        this.ctx!.logger.debug(sql);
        const result = await mysql.query(sql);
        this.ctx!.logger.debug(result);
        const [{ changedRows }] = result;
        return changedRows;
    }
}
