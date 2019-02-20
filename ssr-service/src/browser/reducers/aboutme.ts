import types from '../const/actionTypes';

import Action from '@/browser/actions/Action';

export default function aboutme(state = null, action: Action) {
  switch (action.type) {
    case types.SET_ABOUT_ME:
      return action.aboutme;
    default:
      return state;
  }
}
