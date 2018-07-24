// @flow
// 这个注释需要放顶部头部
import * as React from 'react'

type Props = {
  count: number, // count is required.
  content?: string,
  children?: React.Node
}

type State = {
  isBlue: boolean,
  a: ?boolean,
  b?: boolean,
  c: string | number,
  tuple: [string, number]
}

class FlowDemo extends React.Component<Props, State> {
  static defaultProps: Props = {
    count: 42 // ...but we have a default prop for foo.
  }
  state: State = {
    isBlue: false,
    a: null,
    c: 1,
    tuple: ['1', 1]
  }

  constructor(props: Props) {
    super(props)
  }

  concat = (a: string, b: string): string => a + b

  componentDidMount() {
    let a: string = this.concat('A', 'B')

    setInterval(() => {
      this.setState((prevState: State) => ({ isBlue: !prevState.isBlue }))
    }, 1000)
  }

  render() {
    const { content, count } = this.props
    const { isBlue } = this.state
    return (
      <section>
        <h1>prop</h1>
        <p>{content}</p>
        <p>{count}</p>
        <hr />
        <h1>state</h1>
        <p>isBlue:{isBlue ? 'Yes' : 'No'}</p>
        <hr />
        <h1>function</h1>
      </section>
    )
  }
}

export default FlowDemo
