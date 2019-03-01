import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { StaticRouter, StaticRouterContext } from 'react-router';

import { matchRoutes, renderRoutes } from 'react-router-config';

import RouteConfig from '@/browser/pages/router.config';

import { getStore } from '@/browser/store';
import { Provider } from 'react-redux';

interface WithStyleStaticRouterContext extends StaticRouterContext {
  styles?: string[];
  referUrl?: string;
}

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
    let context: WithStyleStaticRouterContext = { styles: [] };
    // set preload data in store
    const promiseifyDataLoaders = withParamsDataLoaders
      .map((dataLoader: any) => dataLoader.loadData(store, dataLoader.params));

    try {
      await Promise.all(promiseifyDataLoaders);
    } catch (e) {
      // handle preload data is no found or error
      context = { ...context, referUrl: ctx.url };
      ctx.url = '/service-error';
      ctx.logger.error(`${e.config.method} ${e.config.url} ${e.response.status}  ${e.response.statusText}`);
    }

    const markup = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.url} context={context}>
          {renderRoutes(RouteConfig)}
        </StaticRouter>
      </Provider>
    );

    const template = {
      root: markup,
      state: JSON.stringify(store.getState()) || '',
      styles: context.styles ? context.styles.join('') : ''
    };

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

  }
  await next();
};