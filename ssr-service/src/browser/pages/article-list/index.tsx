import * as React from 'react';

import actions from '@/browser/actions/article';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from '@/browser/components/HOC/withStyles';
import * as style from './article-list.css';

import Loading from '@/browser/components/loading/';
import * as Loadable from 'react-loadable';

const LoadableArticleList = Loadable({
  loader: () => import('@/browser/pages/article-list/article-list'),
  loading: Loading
});

const ConnectArticleList = connect(mapStateToProps, mapDispatchToProps)(LoadableArticleList);

class ArticleList extends React.Component {
  public static loadData(store: any, params: any): void {
    return store.dispatch(actions.getArticlePaging(params));
  }

  public render() {
    return <ConnectArticleList {...this.props} />;
  }
}

function mapStateToProps(state: any) {
  return { ...state.article };
}

function mapDispatchToProps(dispatch: any) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withStyles(style)(ArticleList);
