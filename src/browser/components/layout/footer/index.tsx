import * as React from 'react';
import * as style from './footer.css';

import withStyles from '@/browser/components/HOC/withStyles';

import { withRouter } from 'react-router';

class Footer extends React.Component<any, any> {
  public render() {
    const { children, ...orther } = this.props;
    return (
      <footer className={style.footer} {...orther}>
        {children}
      </footer>
    );
  }
}

export default withRouter(withStyles(style)(Footer));
