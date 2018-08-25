import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.scss';
import Demo from '../demo';
import AboutMe from '../about-me';

class App extends Component {
	render() {
		return (
			<Router>
				<Route path="/" component={Demo} />
				<Route path="/aboutme" component={AboutMe} />
			</Router>
		);
	}
}

export default App;
