import types from '@/browser/const/actionTypes';

import Article from '@/model/Articles';

import { getAgent } from '../../agent/';

import { PAGE_NUM, PAGE_SIZE } from '@/browser/const/';

const agent = getAgent();

function setCurArticle(curArticle: Article) {
  return {
    type: types.SET_CURRNET_ARTICLE,
    curArticle
  };
}

function setActiveOrderBy(activeOrderBy: Article) {
  return {
    type: types.SET_ACTIVE_ORDERBY,
    activeOrderBy
  };
}

function setArticleList(articleList: Article) {
  return {
    type: types.SET_ARTICLE_LIST,
    articleList
  };
}

function nextPage() {
  return {
    type: types.NEXT_PAGE
  };
}

function getArticleById(id: number) {
  return async (dispatch: any) =>
    await agent.get(`/article/${id}`).then((resp: any) => {
      dispatch(setCurArticle(resp.data));
      return resp;
    });
}

function getArticlePaging(params: any) {
  const { pageNum = PAGE_NUM, pageSize = PAGE_SIZE, orderBy, categoryId } = params;
  return async (dispatch: any) =>
    await agent.get(`/article/paging`, { params: { pageNum, pageSize, orderBy, categoryId } }).then((resp: any) => {
      dispatch(setArticleList(resp.data.list));
      return resp;
    });
}

export default {
  nextPage,
  setActiveOrderBy,
  getArticleById,
  setCurArticle,
  getArticlePaging
};
