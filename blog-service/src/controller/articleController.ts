import Controller from './Controller';

export default class ArticleController extends Controller {
  public getArticleById = async () => {
    // getPrevArticle
    // getNextArticle
    // getgetArticleById
    this.ctx!.body = {
      list: [
        {
          id: 1,
          category: { id: 1, name: 'JS' },
          title: 'Hello world',
          content: 'Hello world',
          pageview: 2,
          like: 11,
          createTime: Date.now(),
          updateTime: Date.now()
        },
        {
          id: 2,
          category: { id: 1, name: 'JS' },
          title: 'Hello world agained',
          content: 'Hello world agained',
          pageview: 99,
          like: 23,
          createTime: Date.now(),
          updateTime: Date.now()
        }
      ]
    };
  }
  public getArticlePaging = async () => {
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

  public getArticleList = async () => { }

  public like = async () => { }

  public countPageView = async () => { }

  public saveArticle = async () => { }

}
