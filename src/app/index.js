import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.scss';
import Demo from '@/demo';
import AboutMe from '@/about-me';
import NavBar from '@/layout/navbar/';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<NavBar />
					<Route exact path="/" component={Demo} />
					<Route path="/aboutme" component={AboutMe} />
				</div>
			</Router>
		);
	}
}

export default App;
