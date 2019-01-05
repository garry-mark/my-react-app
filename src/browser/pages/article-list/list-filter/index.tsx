import * as style from './article-filter.css';

import * as React from 'react';

import { ORDER_BY_CREATETIME, ORDER_BY_PAGEVIEW } from '@/const';

class ArticleListFilter extends React.PureComponent<any, any> {

  public render() {
    const { activeOrderBy, setActiveOrderBy } = this.props;
    return (
      <div className={style.articleListFilter}>
        <button
          className={activeOrderBy === ORDER_BY_CREATETIME ? style.active : ''}
          onClick={() => setActiveOrderBy(ORDER_BY_CREATETIME)}
        >
          最新
        </button>
        <button
          className={activeOrderBy === ORDER_BY_PAGEVIEW ? style.active : ''}
          onClick={() => setActiveOrderBy(ORDER_BY_PAGEVIEW)}
        >
          最Top
        </button>
      </div>
    );
  }
}

export default ArticleListFilter;
