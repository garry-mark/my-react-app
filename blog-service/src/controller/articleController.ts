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
    path: '/paging',
    methods: 'get',
    queryRules: {
      pageNum: {
        type: 'int',
        default: 1,
        required: false,
        convertType: 'int'
      },
      pageSize: {
        type: 'int',
        default: 10,
        required: false,
        convertType: 'int'
      },
      keyword: {
        type: 'string',
        required: false,
        default: ''
      }
    }
  })
  public async getArticlePaging() {
    // 默认按照创建时间排序，另外可以对点赞量、访问量进行排序
    // 可以通过文章类别、名字和内容进行筛选
    // 分页
    const { pageNum, pageSize, keyword = '', categoryId } = this.ctx!.query;

    this.ctx!.body = await this.services
      .ArticleService
      .getArticlePaging(
        pageNum,
        pageSize,
        {
          keyword,
          categoryId
        }
      );
  }

  @Route({
    path: '/:id',
    methods: 'get',
    paramsRules: {
      id: {
        type: 'int',
        convertType: 'int',
      }
    }
  })
  public async getArticleById() {
    const { id } = this.ctx!.params;
    // bug: 1a is invalidate but pass.
    this.ctx!.body = await this.services.ArticleService.getArticleById(id);
  }

  @Route({
    path: '/',
    methods: 'get',
  })
  public async getArticleList() { }

  @Route({
    path: '/like',
    methods: 'put',
  })
  public async like() { }

  public async countPageView() { }

  @Route({
    path: '/',
    methods: 'post',
  })
  public async createArticle() { }

  @Route({
    path: '/',
    methods: 'put',
  })
  public async updateArticle() { }

  @Route({
    path: '/',
    methods: 'delete',
  })
  public async deleteArticle() { }

}

export default ArticleController