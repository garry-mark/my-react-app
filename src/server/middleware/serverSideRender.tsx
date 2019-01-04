import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { StaticRouter, StaticRouterContext } from 'react-router';

import { matchRoutes, renderRoutes } from 'react-router-config';

import RouteConfig from '@/pages/router.config';

import { getStore } from '@/store';
import { Provider } from 'react-redux';

function matchRouteConifg(url: string) {
  const branch = matchRoutes(RouteConfig, url);
  return branch.map((route: any) => route.route.loadData).filter((dataLoader) => dataLoader);
}

export default async (ctx: any, next: any) => {
  const dataLoaders = matchRouteConifg(ctx.url);
  const regexp = /\w+\.\w+$/;
  const store = getStore();

  if (!regexp.test(ctx.url)) {
    // set preload data in store
    const promiseifyDataLoaders = dataLoaders.map((dataLoader: any) => dataLoader(store));

    const context: StaticRouterContext = {};
    const template = await Promise.all(promiseifyDataLoaders).then(() => {
      const markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={context}>
            {renderRoutes(RouteConfig)}
          </StaticRouter>
        </Provider>
      );
      return { root: markup, state: store.getState() };
    });
    switch (context.statusCode) {
      default:
        await ctx.render('index', template);
        break;
      case 301:
      case 302:
        ctx.status = context.statusCode;
        ctx.redirect(context.url);
        break;
      case 404:
        ctx.status = context.statusCode;
        await ctx.render('index', template);
        break;
    }
  } else {
    await next();
  }
};
