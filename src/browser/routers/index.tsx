import * as React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import * as Loadable from 'react-loadable';

import Loading from '@/components/loading/';

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

class Router extends React.Component<any, any> {
	public state: any = {};

	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<Switch>
				<Redirect exact={true} from="/" to="/home" />
				<Route path="/home" component={ArticleList} />
				<Route path="/aboutme" component={AboutMe} />
				<Route path="/article/:id" component={ArticleDetails} />
				{this.props.children}
			</Switch>
		);
	}
}

export default Router;
