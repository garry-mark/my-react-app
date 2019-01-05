import Article from '@/model/Articles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as React from 'react';

import * as style from './article.css';

interface ArticleDetailsState {
  article: Article;
}

class ArticleDetails extends React.Component<any, ArticleDetailsState> {
  public state: ArticleDetailsState = {
    article: {
      id: -1,
      category: { id: -1, name: 'string' },
      title: 'string',
      content: 'string',
      pageview: 0,
      like: 0,
      createTime: 0,
      updateTime: 0
    }
  };

  public componentDidMount() {
    if (this.props.article === null) {
      this.getArticle();
    }
  }

  public render() {
    const { article } = this.props;
    const {
      category,
      title,
      content,
      pageview,
      like,
      createTime,
      updateTime
    } = article || this.state.article;
    return (
      <article className={style.article}>
        <h2>
          [{category && category.name}] {title}
        </h2>
        <ul>
          <li>
            <time>创建时间：{new Date(createTime).toLocaleString()}</time>
          </li>
          <li>
            <time>最后更新：{new Date(updateTime).toLocaleString()}</time>
          </li>
          <li>
            <FontAwesomeIcon icon="thumbs-up" /> {like}
          </li>
          <li>
            <FontAwesomeIcon icon="eye" /> {pageview}
          </li>
        </ul>
        <div>{content}</div>
      </article>
    );
  }

  private getArticle() {
    const { actions, match } = this.props;
    actions.getArticleById(match.params.id);
  }
}

export default ArticleDetails;
