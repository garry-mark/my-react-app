import * as React from 'react';
import * as style from './main.css';

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

export default Main;
