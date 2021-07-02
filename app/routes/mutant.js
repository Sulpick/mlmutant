const Router = require('koa-router');
const { mutant, stats } = require('../controller/mutant');

const router = new Router({});

router.post('/mutant/', mutant);
router.get('/stats/', stats);

module.exports = router;
