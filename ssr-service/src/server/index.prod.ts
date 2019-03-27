import 'babel-polyfill';

import app from '@/server/app';

import * as log4js from 'log4js';

import * as config from '../../app.config';

const logger = log4js.getLogger('APP');

const port = process.env.PORT || config.app[process.env.NODE_ENV].port;

app.listen(port, () => {
  logger.trace(
    `\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
  );
});
