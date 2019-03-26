import * as style from './article-list.css';

import * as React from 'react';

import ArticleListItem from './list-item';

import ArticleListFilter from './list-filter';

import Article from '@/model/Article';

interface State {
  pageSize: number;
  pageCurrent: number;
}

class ArticleList extends React.Component<any, State> {

  public componentDidMount() {
    if (this.props.articleList.length === 0) {
      this.getArticleList();
    }
  }

  public componentDidUpdate(preProps: any) {
    const { actions, pageNum } = this.props;
    if (preProps.pageNum !== pageNum) {
      actions.getArticlePaging({ pageNum });
    }
  }

  public getMore = () => {
    const { actions } = this.props;
    actions.nextPage();
  }

  public getArticleList = (options = {}) => {
    const { actions } = this.props;
    actions.getArticlePaging(options);
  }

  public render() {
    const { actions, articleList, activeOrderBy } = this.props;

    return (
      <section>
        <ArticleListFilter
          activeOrderBy={activeOrderBy}
          getArticleList={this.getArticleList}
          setActiveOrderBy={actions.setActiveOrderBy}
        />
        {articleList.map((item: Article) => (
          <ArticleListItem key={item.id} article={item} setCurArticle={actions.setCurArticle} />
        ))}
        <button onClick={this.getMore} className={style.more}>
          查看更多
        </button>
      </section>
    );
  }
}

export default ArticleList;
