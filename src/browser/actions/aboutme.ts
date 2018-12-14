import types from '@/const/actionTypes';
import fetch from 'cross-fetch';

import Me from '@/model/Me';

function replaceAboutme(aboutme: Me) {
  return {
    type: types.REPLACE_ABOUT_ME,
    aboutme
  };
}

function fetchAboutme() {
  return (dispatch: any) => {
    fetch('/api/aboutme/', {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((data: any) => {
        dispatch(replaceAboutme(data));
      });
  };
}

export default {
  fetchAboutme,
  replaceAboutme
};
