const Router = require('koa-router');
const router = new Router();

const articleRoutes = require('./article');

router.use('/api', articleRoutes);

module.exports = router.routes();
