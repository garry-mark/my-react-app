import types from '@/const/actionTypes';

import Article from '@/model/Articles';

import { getAgent } from '../../agent/';

const agent = getAgent();

function setArticle(article: Article) {
  return {
    type: types.SET_ARTICLE,
    article
  };
}

function getArticleById(id: number) {
  return async (dispatch: any) =>
    await agent.get(`/api/article/${id}`).then((resp: any) => {
      dispatch(setArticle(resp.data));
      return resp;
    });
}

export default {
  getArticleById,
  setArticle
};
