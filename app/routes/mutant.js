const Router = require('koa-router');
const router = new Router({})
const { mutant } = require('../controller/mutant');

router.post('/mutant/', mutant);

module.exports = router;