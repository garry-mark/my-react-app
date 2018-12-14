import types from '../const/actionTypes';

import Action from '@/actions/Action';

export default function aboutme(state = null, action: Action) {
  switch (action.type) {
    case types.REPLACE_ABOUT_ME:
      return action.aboutme;
    default:
      return state;
  }
}
