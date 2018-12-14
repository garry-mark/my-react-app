import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { StaticRouter } from 'react-router-dom';

import { matchRoutes, renderRoutes } from 'react-router-config';

import RouteConfig from '@/pages/router.config';

import { getStore } from '@/store';
import { Provider } from 'react-redux';

function matchRouteConifg(url: string) {
  if (url === '/') {
    return true;
  }
  const branch = matchRoutes(RouteConfig, url);
  return branch.length !== 1;
}

const store = getStore();

export default async (ctx: any, next: any) => {
  const isMatch = matchRouteConifg(ctx.url);

  if (isMatch) {
    const context: { url?: string } = {};
    const markup = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.url} context={context}>
          {renderRoutes(RouteConfig)}
        </StaticRouter>
      </Provider>
    );

    await ctx.render('index', { root: markup, state: store.getState() });
  } else {
    await next();
  }
};
