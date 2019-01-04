import * as React from 'react';
import StatusCode from './index';

class RedirectStatus extends React.Component {
  public render() {
    return <StatusCode code={404} >Not Found!</StatusCode>;
  }
}

export default RedirectStatus;
