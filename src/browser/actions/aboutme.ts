import types from '@/const/actionTypes';

import Me from '@/model/Me';

import { getAgent } from '../../agent/';

const agent = getAgent();

function replaceAboutme(aboutme: Me) {
  return {
    type: types.REPLACE_ABOUT_ME,
    aboutme
  };
}

function fetchAboutme() {
  return (dispatch: any) => {
    return agent.get('/api/aboutme/').then((resp: any) => {
      dispatch(replaceAboutme(resp.data));
      return resp;
    });
  };
}

export default {
  fetchAboutme,
  replaceAboutme
};
