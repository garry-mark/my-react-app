import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './theme/global.css';

import App from './pages/app';
// import 'babel-polyfill';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faEye,
	faShareSquare,
	faThumbsUp
} from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp, faShareSquare, faEye);

const Root = () => (
	<Router>
		<App />
	</Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
