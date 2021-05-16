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
                    findOne: jest
                    .fn()
                    .mockReturnValue({ result: "This is a test :)" }),
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
      const dna =  ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
      const result = await searchAndInsert(dna, "humans");
      expect(result).toEqual({ result: "This is a test :)" });
    });
  });