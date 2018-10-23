import './article.scss'
// @flow
import type { Article } from '@/model/Article'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import Loading from '@/components/loading'

type Props = {
  location: Object
}

type State = {
  article: Article,
  loading: boolean
}

class ArticleDetails extends React.Component<Props, State> {
  static defaultProps: Props = {}
  state: State = {
    article: {},
    loading: true
  }

  constructor(props: Props) {
    super(props)
  }
  componentDidMount() {
    const { location } = this.props
    if (location.state) {
      this.setState({ article: location.state.article, loading: false })
    } else {
      setTimeout(() => {
        this.setState({
          article: {
            id: 1,
            category: { id: 1, name: 'JS' },
            title: 'Hello world',
            content: 'Hello world',
            pageview: 2,
            like: 11,
            createTime: Date.now(),
            updateTime: Date.now()
          },
          loading: false
        })
      }, 2000)
    }
  }
  render() {
    const { article, loading } = this.state
    const {
      category,
      title,
      content,
      pageview,
      like,
      createTime,
      updateTime
    } = article
    return loading ? (
      <Loading />
    ) : (
      <article styleName="article">
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
    )
  }
}

export default ArticleDetails
