/* eslint-disable dot-notation */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
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

const deleteId = (object) => {
  if (object._id) {
    delete object['_id'];
  }
  return object;
};

const getDatabase = () => {
  if (!client) {
    start();
  }
  return client;
};

const findAndInsert = async (collection, dna) => {
  const database = await getDatabase();
  const search = await database.db().collection(collection).findOne({ dna: query });

  if (!search) {
    const { ops } = await database.db().collection(collection).insertOne({ dna: query });
    return deleteId(ops[0]);
  }
  return deleteId(search);
};

module.exports = {
  findAndInsert,
  start,
  getDatabase,
};
