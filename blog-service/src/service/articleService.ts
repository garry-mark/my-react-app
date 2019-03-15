import Service from "./Service";


export default class ArticleService extends Service {


    public async getArticleById(id: number) {
        const { mysql } = this.ctx!;
        const sql = mysql.format('SELECT id, title, banner, content, `like`, page_view as pageView, origin_type as originType, origin_url as originUrl, origin_name as originName, create_time as createTime,  update_time as updateTime  FROM article WHERE id=?', [id]);
        // this.ctx!.logger.debug(sql);
        const [[data]] = await mysql.query(sql);
        // this.ctx!.logger.debug(data);

        return data
    }

    public async createArticle() { }

    public async deleteArticle() { }

    public async updateArticle() { }
}
