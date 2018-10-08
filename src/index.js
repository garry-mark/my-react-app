import './styles/gobal.scss';

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '@/pages/app';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faThumbsUp,
	faShareSquare,
	faEye
} from '@fortawesome/free-solid-svg-icons';

library.add([faThumbsUp, faShareSquare, faEye]);

const Root = () => (
	<Router>
		<App />
	</Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
