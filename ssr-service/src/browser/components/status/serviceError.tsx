import * as React from 'react';
import StatusCode from './index';

import { Link } from 'react-router-dom';

class ServiceError extends React.Component {

  public renderElement(props: any) {
    return (
      <React.Fragment>
        {props.referUrl ? <Link to={props.referUrl as string} >重新尝试</Link> : ''}
        Service Error!
      </React.Fragment>);
  }
  public render() {
    return <StatusCode code={500} render={(props: any) => this.renderElement(props)} />;
  }
}

export default ServiceError;
