import './style.scss';
// @flow
import * as React from 'react';
import { Route } from 'react-router-dom';

import Demo from '@/demo';
import AboutMe from '@/about-me';
import Header from '@/layout/header/';
import NavBar from '@/layout/navbar/';
import Main from '@/layout/main/';
import Footer from '@/layout/footer/';

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
					<Route exact path="/" component={Demo} />
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
