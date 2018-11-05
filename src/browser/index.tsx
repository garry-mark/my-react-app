// import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '@/theme/global.css';

import { renderRoutes } from 'react-router-config';

import RouteConfig from '@/pages/router.config';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faEye,
	faShareSquare,
	faThumbsUp
} from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp, faShareSquare, faEye);

const Root = () => <BrowserRouter>{renderRoutes(RouteConfig)}</BrowserRouter>;

ReactDOM.render(<Root />, document.getElementById('root'));
