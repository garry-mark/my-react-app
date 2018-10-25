import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './theme/global.css';

import App from './pages/app';
// import 'babel-polyfill';

const Root = () => (
	<Router>
		<App />
	</Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
