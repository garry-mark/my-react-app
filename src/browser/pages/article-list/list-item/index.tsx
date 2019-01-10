import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Article from '@/model/Articles';
import * as style from './article-item.css';

import withStyles from '@/browser/components/HOC/withStyles';

import { withRouter } from 'react-router';

interface ArticleListItemProps {
  article: Article;
  setCurArticle: (article: Article) => void;
}

class ArticleListItem extends React.PureComponent<ArticleListItemProps> {
  public render() {
    const { article, setCurArticle } = this.props;
    const {
      id,
      category,
      title,
      content,
      pageview,
      like,
      createTime
    } = article;
    return (
      <div className={style.articleListItem}>
        <div className={style.articleTop}>
          <span>
            来自分类 <em>{category.name}</em>
          </span>
          <time>{new Date(createTime).toLocaleString()}</time>
        </div>
        <h3>
          <Link to={{ pathname: `/article/${id}` }} onClick={() => setCurArticle(article)}>
            {title}
          </Link>
        </h3>
        <div className={style.articleContent}>{content}</div>
        <div className={style.articleBottom}>
          <button>
            <FontAwesomeIcon icon="thumbs-up" /> 赞 ({like > 999
              ? '999+'
              : like})
          </button>
          <button>
            <FontAwesomeIcon icon="eye" /> 浏览量（{pageview > 999
              ? '999+'
              : pageview}）
          </button>
          <button>
            <FontAwesomeIcon icon="share-square" /> 分享
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(style)(ArticleListItem));
