import * as React from 'react';

import '@/theme/global.css';

import * as style from './app.css';

import Header from '@/components/layout/header/';

import NavBar from '@/components/layout/navbar/';

import Footer from '@/components/layout/footer/';
import Main from '@/components/layout/main/';
import Status from '@/components/status/';

import { Switch } from 'react-router-dom';

import { renderRoutes } from 'react-router-config';

import { connect } from 'react-redux';

class App extends React.Component<any, any> {
  public state: any = {};

  constructor(props: any) {
    super(props);
  }

  public render() {
    const { route } = this.props;
    return (
      <div className={style.app}>
        <Header>
          <NavBar />
        </Header>
        <Main>
          <Switch>
            {/* <Redirect exact={true} from="/" to="/home" /> */}
            <Status isRedirect={true} exact={true} code={301} from="/" to="/home" />

            {renderRoutes(route.routes)}
          </Switch>
        </Main>
        <Footer>
          <p>备案号：XXXX</p>
        </Footer>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return state;
}

export default connect(mapStateToProps, null)(App);
