import './article-filter.scss'
// @flow
import * as React from 'react'
import { ORDER_BY_CREATETIME, ORDER_BY_PAGEVIEW } from '@/const'

type Props = {}

type State = {
  activeOrder: string
}

class ArticleListFilter extends React.Component<Props, State> {
  static defaultProps: Props = {}
  state: State = {
    activeOrder: ORDER_BY_CREATETIME
  }

  constructor(props: Props) {
    super(props)
  }
  componentDidMount() {}
  changeListOrder = newOrder => {
    this.setState({ activeOrder: newOrder })
  }

  render() {
    // const {} = this.props;
    const { activeOrder } = this.state
    return (
      <div styleName="article-list-filter">
        <button
          styleName={activeOrder === ORDER_BY_CREATETIME ? 'avtive' : ''}
          onClick={e => this.changeListOrder(ORDER_BY_CREATETIME, e)}>
          最新
        </button>
        <button
          styleName={activeOrder === ORDER_BY_PAGEVIEW ? 'avtive' : ''}
          onClick={e => this.changeListOrder(ORDER_BY_PAGEVIEW, e)}>
          最Top
        </button>
      </div>
    )
  }
}

export default ArticleListFilter
