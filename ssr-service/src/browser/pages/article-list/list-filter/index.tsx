import * as style from './article-filter.css';

import * as React from 'react';

import { ORDER_BY_CREATETIME, ORDER_BY_PAGEVIEW } from '@/browser/const';

import withStyles from '@/browser/components/HOC/withStyles';

import { withRouter } from 'react-router';

class ArticleListFilter extends React.PureComponent<any, any> {

  public getArticleOrderBy = (orderBy: string) => {
    const { setActiveOrderBy, getArticleList } = this.props;
    setActiveOrderBy(orderBy);
    getArticleList({ orderBy });
  }

  public render() {
    const { activeOrderBy } = this.props;
    return (
      <div className={style.articleListFilter}>
        <button
          className={activeOrderBy === ORDER_BY_CREATETIME ? style.active : ''}
          onClick={() => this.getArticleOrderBy(ORDER_BY_CREATETIME)}
        >
          最新
        </button>
        <button
          className={activeOrderBy === ORDER_BY_PAGEVIEW ? style.active : ''}
          onClick={() => this.getArticleOrderBy(ORDER_BY_PAGEVIEW)}
        >
          最Top
        </button>
      </div>
    );
  }
}

export default withRouter(withStyles(style)(ArticleListFilter));
