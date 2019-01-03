import * as React from 'react';

import actions from '@/actions/aboutme';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '@/components/loading/';
import * as Loadable from 'react-loadable';

import action from '@/actions/aboutme';

const LoadableAboutMe = Loadable({
  loader: () => import('@/pages/about-me/about-me'),
  loading: Loading
});

const ConnectAboutMe = connect(mapStateToProps, mapDispatchToProps)(LoadableAboutMe);

class AboutMe extends React.Component {
  public static loadData(store: any): void {
    return store.dispatch(action.fetchAboutme());
  }

  public render() {
    return <ConnectAboutMe />;
  }
}

function mapStateToProps(state: any) {
  return { aboutme: state.aboutme };
}

function mapDispatchToProps(dispatch: any) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default AboutMe;
