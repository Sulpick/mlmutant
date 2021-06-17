const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mutantRoute = require('./routes/mutant');
const database = require('./utils/database');
const { logger } = require('./services/logger');
require('dotenv').config();

const app = new Koa();

app.use(bodyParser());
app.use(mutantRoute.routes());
app.listen(process.env.PORT, async () => {
  await database.start();
  logger.info(`Servidor escuchando desde el puerto ${process.env.PORT}`);
});
