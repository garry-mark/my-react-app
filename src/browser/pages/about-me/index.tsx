import * as React from 'react';

import actions from '@/browser/actions/aboutme';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '@/browser/components/loading/';
import * as Loadable from 'react-loadable';

const LoadableAboutMe = Loadable({
  loader: () => import('@/browser/pages/about-me/about-me'),
  loading: Loading
});

const ConnectAboutMe = connect(mapStateToProps, mapDispatchToProps)(LoadableAboutMe);

class AboutMe extends React.Component {
  public static loadData(store: any): void {
    return store.dispatch(actions.getAboutme());
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
