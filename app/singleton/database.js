const MongoClient = require("mongodb").MongoClient;
const { logger } = require("../services/logger");
require("dotenv").config();
var db = null;
const start = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 1000,
  };

  try {
    const mongo = new MongoClient(process.env.MONGO_URL, options);
    await mongo.connect().then(() => {
      logger.info("Conectado exitosamente a MongoDB");
      db = mongo.db("mlmutant");
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

const getDb = async () => {
  if (!db) {
    await start();
  }
  return db;
};

module.exports = {
  start,
  getDb,
};
