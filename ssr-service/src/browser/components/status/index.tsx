import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface StatusCodeProps {
  code: number;
  children?: any;
  isRedirect?: boolean;
  from?: string;
  to?: string;
  exact?: boolean;
}

const StatusCode = ({ code, children, from = '', to = '', isRedirect = false, exact = false }: StatusCodeProps) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.statusCode = code;
      }
      return isRedirect ? <Redirect exact={exact} from={from} to={to} /> : children;
    }}
  />
);

export default StatusCode;
