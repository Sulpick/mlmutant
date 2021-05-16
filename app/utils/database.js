const { getDb } = require("../singleton/database");

const searchAndInsert = async (dna, type) => {
  const search = await findOne(dna, type);
  if (!search) {
    const { ops } = await insertOne(dna, type);
    return ops[0];
  }
  return search;
};

const insertOne = async (dna, type) => {
  const db = await getDb();

  return db.collection(type).insertOne({
    dna: dna,
  });
};

const findOne = async (dna, type) => {
  const db = await getDb();
  return db.collection(type).findOne({ dna: dna });
};

module.exports = {
  insertOne,
  findOne,
  searchAndInsert,
};
