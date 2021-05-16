const {
  isMutationPresent,
  isMutant,
  getMutations,
  checkCounter,
  checkOblique,
  isSafe,
  createMatrix,
} = require("../services/mutant");

describe("Unit tests of mutant service", () => {
  it("Should check if an index if safe, true result", () => {
    const x = 2;
    const y = 2;
    const size = 3;
    const result = isSafe(x, y, size);
    expect(result).toBe(true);
  });
  it("Should check if an index if safe, false result", () => {
    const x = 5;
    const y = 5;
    const size = 3;
    const result = isSafe(x, y, size);
    expect(result).toBe(false);
  });
  it("Should create a matrix from a string array", () => {
    const dna = ["DUMMYS", "DUMMYS", "DUMMYS", "DUMMYS", "DUMMYS", "DUMMYS"];
    const matrix = createMatrix(dna);
    expect(matrix).toBeDefined();
  });
  it("Should check a counter, true result", () => {
    const counter = 3;
    const result = checkCounter(counter);
    expect(result).toBe(true);
  });
  it("Should check a counter, false result", () => {
    const counter = 1;
    const result = checkCounter(counter);
    expect(result).toBe(false);
  });
  it("Should check oblique mutation, all true", () => {
    const regex = /([ATCG])\1{3}/g;
    const testObject = {
      principal: ["A", "A", "A", "A", "T", "G"],
      second: ["C", "C", "C", "C", "T"],
      third: ["T", "T", "T", "T"],
    };

    const result = checkOblique(testObject, regex);
    expect(result).toBe(3);
  });
  it("Should check oblique mutation, all false", () => {
    const regex = /([ATCG])\1{3}/g;
    const testObject = {
      principal: ["A", "T", "C", "A", "T", "G"],
      second: ["C", "T", "C", "C", "T"],
      third: ["T", "A", "T", "T"],
    };

    const result = checkOblique(testObject, regex);
    expect(result).toBe(0);
  });
  it("Should check if there is a mutation present", () => {
    const dna = ["C", "C", "C", "C", "T", "A"];
    const regex = /([ATCG])\1{3}/g;
    const result = isMutationPresent(dna, regex);
    expect(result).toBe(true);
  });
  it("Should get mutations given a matrix and a regex, none as result", () => {
    const dna = ["DUMMYS", "DUMMYS", "DUMMYS", "DUMMYS", "DUMMYS", "DUMMYS"];
    const matrix = createMatrix(dna);
    const regex = /([ATCG])\1{3}/g;
    const result = getMutations(matrix, regex);
    expect(result).toBe(0);
  });
  it("Should check is a dna belongs to a mutant, false result", () => {
    const dna = ["DUMMYS", "DUMMYS", "DUMMYS", "DUMMYS", "DUMMYS", "DUMMYS"];
    const result = isMutant(dna);
    expect(result).toBe(false);
  });
  it("Should check is a dna belongs to a mutant, true result", () => {
    const dna = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
    const result = isMutant(dna);
    expect(result).toBe(true);
  });
});
