import * as React from 'react';

import actions from '@/browser/actions/article';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from '@/browser/components/HOC/withStyles';
import * as style from './article.css';

import Loading from '@/browser/components/loading/';
import * as Loadable from 'react-loadable';

const LoadableArticleDetails = Loadable({
  loader: () => import('@/browser/pages/article/article'),
  loading: Loading
});

const ConnectArticleDetails = connect(mapStateToProps, mapDispatchToProps)(LoadableArticleDetails);

class ArticleDetails extends React.Component {
  public static loadData(store: any, params: any): void {
    const { id } = params;
    return store.dispatch(actions.getArticleById(id));
  }

  public render() {
    // ...this.props is wrapped route prop
    return <ConnectArticleDetails {...this.props} />;
  }
}

function mapStateToProps(state: any) {
  return { article: state.article.curArticle };
}

function mapDispatchToProps(dispatch: any) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withStyles(style)(ArticleDetails);
