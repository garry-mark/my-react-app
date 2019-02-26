import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface StatusCodeProps {
  code: number;
  children?: any;
  isRedirect?: boolean;
  from?: string;
  to?: string;
  exact?: boolean;
  render?: (props: any) => void;
}

const StatusCode = ({
  code,
  children,
  from = '',
  to = '',
  isRedirect = false,
  exact = false,
  render
}: StatusCodeProps) => {

  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.statusCode = code;
        }
        console.log(staticContext);
        return isRedirect
          ? <Redirect exact={exact} from={from} to={to} />
          : render ? render({ ...staticContext }) : children;
      }}
    />
  );
};

export default StatusCode;
