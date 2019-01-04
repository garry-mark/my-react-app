import * as React from 'react';
import * as Loadable from 'react-loadable';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '@/components/loading/';

import actions from '@/actions/article';

const LoadableArticleDetails = Loadable({
  loader: () => import('@/pages/article/article'),
  loading: Loading
});

const ConnectArticleDetails = connect(mapStateToProps, mapDispatchToProps)(LoadableArticleDetails);

class ArticleDetails extends React.Component {
  public static loadData(store: any, params: any): void {
    console.log(params);
    const { id } = params;
    return store.dispatch(actions.getArticleById(id));
  }

  public render() {
    return <ConnectArticleDetails />;
  }
}

function mapStateToProps(state: any) {
  return { article: state.article };
}

function mapDispatchToProps(dispatch: any) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default ArticleDetails;
