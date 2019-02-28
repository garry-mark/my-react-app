import 'babel-polyfill';

import * as path from 'path';

import * as fs from 'fs';

import * as log4js from 'log4js';

import * as koaWebpack from 'koa-webpack';

import devConfig from '../../config/webpack.browser.dev.conf';

import * as config from '../../app.config';

import app from '@/server/app';

const logger = log4js.getLogger();

const publicPath = (devConfig.output && devConfig.output.publicPath) || '';
const pathName = (devConfig.output && devConfig.output.path) || '';
const port = process.env.PORT || config.app[process.env.NODE_ENV].port;

koaWebpack({
  config: devConfig,
  devMiddleware: {
    publicPath,
    serverSideRender: true
  }
}).then((middleware) => {
  app.use(middleware);

  app.use(async (ctx: any, next: any) => {
    const rs = await middleware.devMiddleware.fileSystem.createReadStream(
      path.resolve(pathName, 'index.html')
    );

    const ws = await fs.createWriteStream(
      path.resolve(__dirname, '../views/index.html')
    );

    await rs.pipe(ws);
    await next();
  });

});

app.listen(port, () => {
  logger.trace(
    `\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
  );
});
