import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import * as Loadable from 'react-loadable';
import * as style from './app.css';

import Header from '@/components/layout/header/';

import Loading from '@/components/loading/';

import NavBar from '@/components/layout/navbar/';

import Footer from '@/components/layout/footer/';
import Main from '@/components/layout/main/';

const ArticleList = Loadable({
	loader: () => import('@/pages/article/list'),
	loading: Loading
});

const AboutMe = Loadable({
	loader: () => import('@/pages/about-me'),
	loading: Loading
});

const ArticleDetails = Loadable({
	loader: () => import('@/pages/article'),
	loading: Loading
});

class App extends React.Component<any, any> {
	public state: any = {};

	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<div className={style.app}>
				<Header>
					<NavBar />
				</Header>
				<Main>
					<Switch>
						<Redirect exact={true} from="/" to="/home" />
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
