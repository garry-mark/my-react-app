import * as React from 'react';
import * as Loadable from 'react-loadable';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '@/components/loading/';

import actions from '@/actions/article';

const LoadableArticleDetails = Loadable({
  loader: () => import('@/pages/article-list/article-list'),
  loading: Loading
});

const ConnectArticleDetails = connect(mapStateToProps, mapDispatchToProps)(LoadableArticleDetails);

class ArticleDetails extends React.Component {
  public static loadData(store: any, params: any): void {
    return store.dispatch(actions.getArticlePaging(params));
  }

  public render() {
    return <ConnectArticleDetails {...this.props} />;
  }
}

function mapStateToProps(state: any) {
  return { ...state.article };
}

function mapDispatchToProps(dispatch: any) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default ArticleDetails;
