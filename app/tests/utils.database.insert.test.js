const { searchAndInsert } = require("../utils/database");

jest.mock("mongodb", () => {
  return {
    MongoClient: jest.fn().mockImplementation(() => {
      return {
        connect: jest.fn(() => Promise.resolve({})),
        db: jest.fn().mockImplementation(() => {
          return {
            collection: jest.fn().mockImplementation(() => {
              return {
                findOne: jest.fn().mockReturnValue(null),
                insertOne: jest
                  .fn()
                  .mockReturnValue({
                    ops: [["This is a test :)", "Dummy ops"]],
                  }),
              };
            }),
          };
        }),
      };
    }),
  };
});

describe("Unit tests of mutant controller", () => {
  it("Should insert one on database", async () => {
    const dna = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
    const result = await searchAndInsert(dna, "mutants");
    expect(result).toEqual(["This is a test :)", "Dummy ops"]);
  });
});
