import './utils/handleTsAlias';

import './utils/handleStyleInNode';

import './utils/handleAssetsInNode';

import * as fs from 'fs';
import * as path from 'path';

import app from '#/app';

import * as webpack from 'webpack';
import devConfig from '../../config/webpack.dev.conf';

import * as views from 'koa-views';
import ssrMiddleware from './middleware/serverSideRender';

import * as koaWebpackDevMiddleware from 'koa-webpack-dev-middleware';

import * as koaWebpackHotMiddleware from 'koa-webpack-hot-middleware';

const convert = require('koa-convert');

const compiler = webpack(devConfig);

compiler.hooks.emit.tapAsync('emit', (compilation, callback) => {
	const assets = compilation.assets;
	let file;
	let data;
	Object.keys(assets).forEach((key) => {
		if (key.match(/\.html$/)) {
			file = path.resolve(__dirname, key);
			data = assets[key].source();
			fs.writeFileSync(file, data);
		}
	});
	callback();
});

app.use(views(path.resolve(__dirname, '../views'), { map: { html: 'ejs' } }));

app.use(ssrMiddleware);

app.use(
	convert(
		koaWebpackDevMiddleware(compiler, {
			publicPath: devConfig.output && devConfig.output.publicPath
		})
	)
);

app.use(convert(koaWebpackHotMiddleware(compiler)));

app.listen(4000);
