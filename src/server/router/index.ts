import * as fs from 'fs';
import * as path from 'path';

import * as Router from 'koa-router';

const router = new Router({ prefix: '/api' });

let subRouter;
fs
  .readdirSync(__dirname)
  .filter((filename) => filename !== path.basename(__filename))
  .forEach((filename) => {
    subRouter = require(`./${filename}`).default;
    router.use(subRouter.routes(), subRouter.allowedMethods());
  });

export default router;
