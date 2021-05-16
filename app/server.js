const Koa = require('koa');
const bodyParser = require('koa-bodyparser'); 
const mutantRoute = require('./routes/mutant.js');
const database = require('../app/singleton/database');
const { logger } = require('../app/services/logger');

const app = new Koa();

app.use(bodyParser());
app.use(mutantRoute.routes());
app.listen(8080, async () => {
    await database.start();
    logger.info('Servidor escuchando desde el puerto 8080');
});
