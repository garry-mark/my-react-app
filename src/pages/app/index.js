import './style.scss';
// @flow
import * as React from 'react';
import { Route } from 'react-router-dom';

import ArticlesList from '@/pages/articles/list/';
import AboutMe from '@/pages/about-me';
import Header from '@/components/layout/header/';
import NavBar from '@/components/layout/navbar/';
import Main from '@/components/layout/main/';
import Footer from '@/components/layout/footer/';

type Props = {};

type State = {};

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
					<Route exact path="/" component={ArticlesList} />
					<Route path="/aboutme" component={AboutMe} />
				</Main>
				<Footer>
					<p styleName="footer">备案号：XXXX</p>
				</Footer>
			</div>
		);
	}
}

export default App;
