import { combineReducers } from 'redux';
import aboutme from './aboutme';
import article from './article';

const rootReducer = combineReducers({ aboutme, article });

export default rootReducer;
