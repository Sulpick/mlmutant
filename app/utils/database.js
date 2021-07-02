/* eslint-disable dot-notation */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const { MongoClient } = require('mongodb');
const { logger } = require('../services/logger');
const { collections } = require('../constants/collections');
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

const deleteCount = (object) => {
  if (object.count) {
    delete object['count'];
  }
  return object;
};

const cleanAttributes = (object) => {
  const objectIdClean = deleteId(object);
  return deleteCount(objectIdClean);
};

const getDatabase = () => {
  if (!client) {
    start();
  }
  return client;
};

const updateCount = async (collection, search) => {
  const { dna } = search;
  let { count } = search;

  count += 1;

  const database = await getDatabase();
  await database.db().collection(collection).updateOne({ dna }, { $set: { count } });
};

const findAndInsert = async (collection, dna) => {
  const database = await getDatabase();
  const search = await database.db().collection(collection).findOne({ dna });

  if (!search) {
    const { ops } = await database.db().collection(collection).insertOne({ dna, count: 1 });
    return cleanAttributes(ops[0]);
  }

  await updateCount(collection, search);

  return cleanAttributes(search);
};

const findCount = async () => {
  const database = await getDatabase();
  const human = await database.db().collection(collections.HUMANS).find().toArray();
  const mutant = await database.db().collection(collections.MUTANTS).find().toArray();

  let humanRate = 0;
  let mutantRate = 0;
  human.forEach((actual) => {
    const { count } = actual;
    humanRate += count;
  });

  mutant.forEach((actual) => {
    const { count } = actual;
    mutantRate += count;
  });

  return {
    count_mutant_dna: mutantRate,
    count_human_dna: humanRate,
    ratio: humanRate !== 0 ? (mutantRate / humanRate) : 1,
  };
};

module.exports = {
  findAndInsert,
  start,
  getDatabase,
  findCount,
};
