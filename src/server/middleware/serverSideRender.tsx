import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { Route, StaticRouter } from 'react-router-dom';

import { matchRoutes } from 'react-router-config';

import RouteConfig from '@/pages/router.config';

function matchRouteConifg(url: string) {
	const branch = matchRoutes(RouteConfig, url);
	if (url === '/') {
		return branch[0].route.component;
	} else if (branch.length !== 1) {
		return branch[branch.length - 1].route.component;
	}
	return null;
}

export default async (ctx: any, next: any) => {
	const matchComp = matchRouteConifg(ctx.url);

	if (matchComp && typeof matchComp === 'function') {
		const context: { url?: string } = {};
		const markup = ReactDOMServer.renderToString(
			<StaticRouter location={ctx.url} context={context}>
				<Route component={matchComp} />
			</StaticRouter>
		);

		await ctx.render('index', { root: markup });
	} else {
		await next();
	}
};
