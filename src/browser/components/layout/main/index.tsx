import * as React from 'react';
import * as style from './main.css';

import { withRouter } from 'react-router';

import withStyles from '@/browser/components/HOC/withStyles';

class Main extends React.Component<any, any> {
  public render() {
    const { children, orther } = this.props;
    return (
      <main className={style.main} {...orther}>
        {children}
      </main>
    );
  }
}

export default withRouter(withStyles(style)(Main));
