const Router = require('koa-router');
const { mutant } = require('../controller/mutant');

const router = new Router({});

router.post('/mutant/', mutant);

module.exports = router;
