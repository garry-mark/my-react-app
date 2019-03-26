import types from '../const/actionTypes';

import Action from '@/browser/actions/Action';

import { ORDER_BY_CREATETIME, PAGE_NUM, PAGE_SIZE } from '@/browser/const/';

const initState = {
  curArticle: null,
  articleList: [],
  pageNum: PAGE_NUM,
  pageSize: PAGE_SIZE,
  activeOrderBy: ORDER_BY_CREATETIME
};

export default function article(state = initState, action: Action) {
  switch (action.type) {
    case types.SET_CURRNET_ARTICLE:
      return { ...state, curArticle: action.curArticle };
    case types.SET_ARTICLE_LIST:
      return { ...state, articleList: action.articleList };
    case types.NEXT_PAGE:
      const pageNum = state.pageNum + 1;
      return { ...state, pageNum };
    case types.SET_ACTIVE_ORDERBY:
      return { ...state, activeOrderBy: action.activeOrderBy };

    default:
      return state;
  }
}
