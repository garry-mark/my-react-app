import './app.scss'
// @flow
import * as React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

// import ArticleList from '@/pages/article/list/';
// import AboutMe from '@/pages/about-me';
// import ArticleDetails from '@/pages/article/';
import Header from '@/components/layout/header/'
import Loading from '@/components/loading'
import NavBar from '@/components/layout/navbar/'
import Main from '@/components/layout/main/'
import Footer from '@/components/layout/footer/'

type Props = {}

type State = {}

const ArticleList = Loadable({
  loader: () => import('@/pages/article/list'),
  loading: Loading
})

const AboutMe = Loadable({
  loader: () => import('@/pages/about-me'),
  loading: Loading
})

const ArticleDetails = Loadable({
  loader: () => import('@/pages/article'),
  loading: Loading
})

class App extends React.Component<Props, State> {
  state: State = {}

  constructor(props: Props) {
    super(props)
  }
  componentDidMount() {}
  render() {
    return (
      <div styleName="app">
        <Header>
          <NavBar />
        </Header>
        <Main>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={ArticleList} />
            <Route path="/aboutme" component={AboutMe} />
            <Route path="/article/:id" component={ArticleDetails} />
          </Switch>
        </Main>
        <Footer>
          <p>备案号：XXXX</p>
        </Footer>
      </div>
    )
  }
}

export default App
