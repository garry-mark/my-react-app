import './app.scss';
// @flow
import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

// import ArticleList from '@/browser/pages/article/list/';
// import AboutMe from '@/browser/pages/about-me';
// import ArticleDetails from '@/browser/pages/article/';
import Header from '@/browser/components/layout/header/';
import Loading from '@/browser/components/loading';
import NavBar from '@/browser/components/layout/navbar/';
import Main from '@/browser/components/layout/main/';
import Footer from '@/browser/components/layout/footer/';

type Props = {};

type State = {};

const ArticleList = Loadable({
	loader: () => import('@/browser/pages/article/list'),
	loading: Loading
});

const AboutMe = Loadable({
	loader: () => import('@/browser/pages/about-me'),
	loading: Loading
});

const ArticleDetails = Loadable({
	loader: () => import('@/browser/pages/article'),
	loading: Loading
});

class App extends React.Component<Props, State> {
	state: State = {};

	constructor(props: Props) {
		super(props);
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
		);
	}
}

export default App;
