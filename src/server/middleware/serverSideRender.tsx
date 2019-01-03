import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { StaticRouter } from 'react-router-dom';

import { matchRoutes, renderRoutes } from 'react-router-config';

import RouteConfig from '@/pages/router.config';

import { getStore } from '@/store';
import { Provider } from 'react-redux';

function matchRouteConifg(url: string) {
  const branch = matchRoutes(RouteConfig, url);
  // console.log(branch);
  if (url === '/' || branch.length !== 1) {
    return {
      isMatch: true,
      dataLoaders: branch.map((route: any) => route.route.loadData).filter((dataLoader) => dataLoader)
    };
  } else {
    // when the url like '/main.js'
    return { isMatch: false, dataLoaders: [] };
  }
}

const store = getStore();

export default async (ctx: any, next: any) => {
  const { isMatch, dataLoaders } = matchRouteConifg(ctx.url);

  if (isMatch) {
    // set preload data in store
    const promiseifyDataLoaders = dataLoaders.map((dataLoader: any) => dataLoader(store));

    const template = await Promise.all(promiseifyDataLoaders).then(() => {
      console.log(store.getState());
      const context: { url?: string } = {};
      const markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={context}>
            {renderRoutes(RouteConfig)}
          </StaticRouter>
        </Provider>
      );
      return { root: markup, state: store.getState() };
    });
    await ctx.render('index', template);
  } else {
    await next();
  }
};
