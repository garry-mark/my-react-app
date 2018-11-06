import './utils/handleTsAlias';

import './utils/handleStyleInNode';

import './utils/handleAssetsInNode';

import * as path from 'path';

import * as fs from 'fs';

import * as koaWebpack from 'koa-webpack';

import devConfig from '../../config/webpack.dev.conf';

import app from '#/app';

const publicPath = (devConfig.output && devConfig.output.publicPath) || '';
const pathName = (devConfig.output && devConfig.output.path) || '';

koaWebpack({
	config: devConfig,
	devMiddleware: {
		publicPath,
		serverSideRender: true
	}
}).then((middleware) => {
	app.use(middleware);

	app.use(async () => {
		const rs = middleware.devMiddleware.fileSystem.createReadStream(
			path.resolve(pathName, 'index.html')
		);

		const ws = fs.createWriteStream(
			path.resolve(__dirname, '../views/index.html')
		);

		rs.pipe(ws);
	});
});

app.listen(4000);
