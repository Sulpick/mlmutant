const database = require("../singleton/database");
const { logger } = require("../services/logger");

jest.mock("mongodb", () => {
  return {
    MongoClient: jest.fn().mockImplementation(() => {
      return {
        connect: jest.fn(() => Promise.resolve({})),
        db: jest.fn().mockReturnValue("dummy"),
      };
    }),
  };
});

beforeEach(() => {
  jest.resetModules();
});

describe("Unit Tests of database singleton ", () => {
  it("Should create instance of data base", () => {
    database.start();
  });

  it("Should get instance of data base", async () => {
    await database.start();
    const db = await database.getDb();
    expect(db).toBe("dummy");
  });

  it("Should get instance of data base", async () => {
    database.getDb();
  });
});
