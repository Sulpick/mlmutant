jest.mock('mongodb');
const database = require('../../app/utils/database');
const mongoMocks = require('../mocks/mongoMocks');

describe('Unit tests for database methods', () => {
  /**
   * @type {import("mongodb").MongoClient}
   */
  let mongoClient = {};

  beforeEach(() => {
    mongoClient = database.start();
  });
  it('Should find and insert, found', async () => {
    mongoClient.db = mongoMocks.mockFound;
    const result = await database.findAndInsert('test', {});
    expect(result).toEqual({ result: 'This is a test :)' });
  });
  it('Should find and insert, inserted', async () => {
    mongoClient.db = mongoMocks.mockNotFound;
    const result = await database.findAndInsert('test', {});
    expect(result).toEqual('This is a test :)');
  });
});
