import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './theme/gobal.css';

import App from './pages/app';
// import 'babel-polyfill';

const Root = () => (
	<Router>
		<App>
			<h1 className="test">123</h1>
		</App>
	</Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
