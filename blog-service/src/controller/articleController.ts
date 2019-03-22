import Controller from './Controller';

import Services from '../decorator/Services';
import ArticleService from '../service/ArticleService';
import Router from '../decorator/Router';
import Route from '../decorator/Route';

import { ArticleOrderByEnum, OriginTypeEnum } from '../enum'

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
        min: 1,
        required: false,
        convertType: 'int'
      },
      pageSize: {
        type: 'int',
        default: 10,
        min: 5,
        max: 50,
        required: false,
        convertType: 'int'
      },
      keyword: {
        type: 'string',
        required: false,
        default: ''
      },
      categoryId: {
        type: 'int',
        min: 1,
        required: false,
        convertType: 'int'
      },
      orderBy: {
        type: 'enum',
        values: Object.values(ArticleOrderByEnum),
        required: false,
      }
    }
  })
  public async getArticlePaging() {
    // 默认按照创建时间排序，另外可以对点赞量、访问量进行排序
    // 可以通过文章类别、名字和内容进行筛选
    // 分页
    this.ctx!.body = await this.services
      .ArticleService
      .getArticlePaging(
        this.ctx!.query
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
    this.ctx!.body = await this.services.ArticleService.getArticleById(id);
  }

  @Route({
    path: '/',
    methods: 'get',
    queryRules: {
      keyword: {
        type: 'string',
        required: false,
        default: ''
      },
      categoryId: {
        type: 'int',
        min: 1,
        required: false,
        convertType: 'int'
      },
      orderBy: {
        type: 'enum',
        values: Object.values(ArticleOrderByEnum),
        required: false,
      }
    }
  })
  public async getArticleList() {
    this.ctx!.body = await this.services
      .ArticleService
      .getArticlePaging(
        {
          ...this.ctx!.query,
          pageNum: 0,
          pageSize: 0
        }
      );
  }

  @Route({
    path: '/like',
    methods: 'put',
  })
  public async like() { }

  public async countPageView() { }

  @Route({
    path: '/',
    methods: 'post',
    bodyRules: {
      articleVo: {
        type: 'object',
        rule: {
          title: {
            type: 'string',
          },
          banner: {
            type: 'string',
          },
          originType: {
            type: 'enum',
            values: Object.values(OriginTypeEnum),
          },
          content: {
            type: 'string',
            required: false,
          },
          originUrl: {
            type: 'string',
            required: false,
          },
          originName: {
            type: 'string',
            required: false,
          },

        }
      }
    }
  })
  public async createArticle() {
    const { articleVo } = this.ctx!.request!.body;
    const insertId = await this.services.ArticleService.createArticle(articleVo);
    this.ctx!.body = {
      insertId
    }
  }

  @Route({
    path: '/',
    methods: 'put',
    bodyRules: {
      articleVo: {
        type: 'object',
        rule: {
          id: {
            type: 'int',
          },
          title: {
            type: 'string',
          },
          banner: {
            type: 'string',
          },
          originType: {
            type: 'enum',
            values: Object.values(OriginTypeEnum),
          },
          content: {
            type: 'string',
            required: false,
          },
          originUrl: {
            type: 'string',
            required: false,
          },
          originName: {
            type: 'string',
            required: false,
          },

        }
      }
    }
  })
  public async updateArticle() {
    const { articleVo } = this.ctx!.request!.body;
    const result = await this.services.ArticleService.updateArticle(articleVo);
    this.ctx!.body = {
      result
    }
  }

  @Route({
    path: '/:id',
    methods: 'delete',
    paramsRules: {
      id: {
        type: 'int',
        convertType: 'int',
      }
    }
  })
  public async deleteArticle() {
    const { id } = this.ctx!.params;
    this.ctx!.body = await this.services.ArticleService.deleteArticle(id);
  }

}

export default ArticleController