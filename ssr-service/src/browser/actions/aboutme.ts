import types from '@/browser/const/actionTypes';

import Me from '@/model/Me';

import { getAgent } from '../../agent/';

const agent = getAgent();

function setAboutme(aboutme: Me) {
  return {
    type: types.SET_ABOUT_ME,
    aboutme
  };
}

function getAboutme() {
  return (dispatch: any) => {
    return agent.get('/user/blogger').then((resp: any) => {
      dispatch(setAboutme(resp.data.data));
      return resp;
    });
  };
}

export default {
  getAboutme,
  setAboutme
};
