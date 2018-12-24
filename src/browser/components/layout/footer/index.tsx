import * as React from 'react';
import * as style from './footer.css';

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

export default Footer;
