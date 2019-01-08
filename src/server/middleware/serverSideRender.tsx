import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { StaticRouter, StaticRouterContext } from 'react-router';

import { matchRoutes, renderRoutes } from 'react-router-config';

import RouteConfig from '@/browser/pages/router.config';

import { getStore } from '@/browser/store';
import { Provider } from 'react-redux';

function matchRouteConifg(url: string) {
  const branch = matchRoutes(RouteConfig, url);
  const withParamsDataLoaders = branch
    .map((route: any) => {
      return route.route.loadData ? { loadData: route.route.loadData, params: route.match.params } : null;
    })
    .filter((route) => route);
  return withParamsDataLoaders;
}

export default async (ctx: any, next: any) => {
  const withParamsDataLoaders = matchRouteConifg(ctx.url);
  const regexp = /\w+\.\w+$/;
  const store = getStore();

  if (!regexp.test(ctx.url)) {
    // set preload data in store
    const promiseifyDataLoaders = withParamsDataLoaders
      .map((dataLoader: any) => dataLoader.loadData(store, dataLoader.params));

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
