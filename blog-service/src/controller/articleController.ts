import Controller from './Controller';

import Services from '../decorator/Services';
import ArticleService from '../service/articleService';
import Router from '../decorator/Router';
import Route from '../decorator/Route';

@Services({ ArticleService })
@Router({
  prefix: '/article',
})
class ArticleController extends Controller {

  @Route({
    path: '/:id',
    methods: 'get',
    validatorRules: {
      id: {
        type: 'int',
        convertType: 'int'
      }
    }
  })
  public async getArticleById() {
    // getPrevArticle
    // getNextArticle
    // getgetArticleById

    const { id } = this.ctx!.params;
    this.ctx!.body = await this.services.ArticleService.getArticleById(id);

    return;
  }

  @Route({
    path: '/paging',
    methods: 'get',
  })
  public async getArticlePaging() {
    // 默认按照创建时间排序，另外可以对点赞量、访问量进行排序
    // 可以通过文章类别、名字和内容进行筛选
    // 分页
    this.ctx!.body = {
      id: 1,
      category: { id: 1, name: 'JS' },
      title: 'Hello world',
      content: 'Hello world',
      pageview: 2,
      like: 11,
      createTime: Date.now(),
      updateTime: Date.now()
    };
  }

  public async getArticleList() { }

  public async like() { }

  public async countPageView() { }

  public async saveArticle() { }

}

export default ArticleController