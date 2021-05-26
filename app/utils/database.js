const { MongoClient } = require('mongodb');
const { logger } = require('../services/logger');
require('dotenv').config();

/**
 * Client from Mongo Connection
 * @type {MongoClient}
 */

let client = null;

const start = () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 1000,
  };

  client = new MongoClient(process.env.MONGO_URL, options);
  client.connect((resp) => {
    if (resp && resp.message) {
      logger.error(resp);
      process.exit();
    } else {
      logger.info('Conectado exitosamente a MongoDB');
    }
  });
  return client;
};

const getDatabase = () => {
  if (!client) {
    start();
  }
  return client;
};

const insertOne = async (collection, query) => {
  const database = await getDatabase();
  return database.db.collection(collection).insertOne({
    query,
  });
};

const findOne = async (collection, query) => {
  const database = await getDatabase();
  return database.db.collection(collection).findOne(query);
};

const findAndInsert = async (collection, query) => {
  const search = await findOne(collection, query);
  if (!search) {
    const { ops } = await insertOne(collection, query);
    return ops[0];
  }
  return search;
};

module.exports = {
  insertOne,
  findOne,
  findAndInsert,
  start,
  getDatabase,
};
