import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '@/browser/reducers';

export function getStore(preloadedState?: any) {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
}
