import types from '../const/actionTypes';

import Action from '@/actions/Action';

export default function article(state = null, action: Action) {
  switch (action.type) {
    case types.SET_ARTICLE:
      return action.article;
    default:
      return state;
  }
}
