import * as Router from 'koa-router';

import AboutemeRouter from './aboutme';
import ArticleRouter from './article';

const router = new Router({ prefix: '/api' });

router.use(AboutemeRouter.routes(), AboutemeRouter.allowedMethods());
router.use(ArticleRouter.routes(), ArticleRouter.allowedMethods());

export default router;
