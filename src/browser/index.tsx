// import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { getStore } from '@/store';
import { Provider } from 'react-redux';

import RouteConfig from '@/pages/router.config';
import { renderRoutes } from 'react-router-config';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faEye,
  faShareSquare,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
library.add(faThumbsUp, faShareSquare, faEye);

const preloadedState = (window as any).REDUX_STATE || {};
const store = getStore(preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(RouteConfig)}</BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
