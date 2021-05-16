const database = require("../singleton/database");

jest.mock("mongodb", () => {
  return {
    MongoClient: jest.fn().mockImplementation(() => {
      return {
        connect: jest.fn(() => Promise.reject({})),
        db: jest.fn(),
      };
    }),
  };
});

beforeEach(() => {
  jest.resetModules();
});

it("Should get error from  database", () => {
  process.exit = jest.fn();
  console.error = jest.fn();
  database.start();
});
