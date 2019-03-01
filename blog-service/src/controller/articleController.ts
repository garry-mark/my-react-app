
export default class ArticleController {
  public async getArticleById(ctx, next) {
    // getPrevArticle
    // getNextArticle
    // getgetArticleById
  }
  public async getArticlePaging(ctx, next) {
    // 默认按照创建时间排序，另外可以对点赞量、访问量进行排序
    // 可以通过文章类别、名字和内容进行筛选
    // 分页
  }

  public async getArticleList(ctx, next) { }

  public async like(ctx, next) { }

  public async countPageView(ctx, next) { }

  public async saveArticle(ctx, next) { }

}
