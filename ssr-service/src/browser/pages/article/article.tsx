import Article from '@/model/Article';

import * as ReactMarkdown from 'react-markdown';

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
      categoryName: 'string',
      title: 'string',
      content: 'string',
      pageView: 0,
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
      categoryName,
      title,
      content,
      pageView,
      like,
      createTime,
      updateTime
    } = article || this.state.article;
    return (
      <article className={style.article}>
        <h2>
          {categoryName ? `[${categoryName}]` : ''} {title}
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
            <FontAwesomeIcon icon="eye" /> {pageView}
          </li>
        </ul>
        <div><ReactMarkdown source={content} /></div>
      </article>
    );
  }

  private getArticle() {
    const { actions, match } = this.props;
    actions.getArticleById(match.params.id);
  }
}

export default ArticleDetails;
