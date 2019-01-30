import 'babel-polyfill';

import * as path from 'path';

import * as fs from 'fs';

import * as koaWebpack from 'koa-webpack';

import devConfig from '../../config/webpack.browser.dev.conf';

import app from '@/server/app';

const publicPath = (devConfig.output && devConfig.output.publicPath) || '';
const pathName = (devConfig.output && devConfig.output.path) || '';
const port = process.env.PORT || 4000;

koaWebpack({
  config: devConfig,
  devMiddleware: {
    publicPath,
    serverSideRender: true
  }
}).then((middleware) => {
  app.use(middleware);

  app.use(async (ctx, next) => {
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
  console.log(
    `\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
  );
});
