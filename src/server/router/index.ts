import * as Router from 'koa-router';
const router = new Router();

const articleRoutes = require('./article');

router.use('/api', articleRoutes);

export default router.routes();
