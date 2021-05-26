const {
  isMutationPresent,
  isMutant,
  getMutations,
  checkOblique,
  isSafe,
  createMatrix,
} = require('../../app/services/mutant');

const {
  safeIndex,
  unSafeIndex,
  dnaArrayDummy,
  obliqueFail,
  obliqueSuccess,
  dnaArraySuccess,
} = require('../mocks/mutantMocks');

describe('Unit tests of mutant service', () => {
  it('Should check if an index if safe, true result', () => {
    const { x, y, size } = safeIndex;
    const result = isSafe(x, y, size);
    expect(result).toBe(true);
  });
  it('Should check if an index if safe, false result', () => {
    const { x, y, size } = unSafeIndex;
    const result = isSafe(x, y, size);
    expect(result).toBe(false);
  });
  it('Should create a matrix from a string array', () => {
    const matrix = createMatrix(dnaArrayDummy);
    expect(matrix).toBeDefined();
  });
  it('Should check oblique mutation, all true', () => {
    const regex = /([ATCG])\1{3}/g;
    const result = checkOblique(obliqueSuccess, regex);
    expect(result).toBe(3);
  });
  it('Should check oblique mutation, all false', () => {
    const regex = /([ATCG])\1{3}/g;
    const result = checkOblique(obliqueFail, regex);
    expect(result).toBe(0);
  });
  it('Should check if there is a mutation present', () => {
    const dna = ['C', 'C', 'C', 'C', 'T', 'A'];
    const regex = /([ATCG])\1{3}/g;
    const result = isMutationPresent(dna, regex);
    expect(result).toBe(true);
  });
  it('Should get mutations given a matrix and a regex, none as result', () => {
    const matrix = createMatrix(dnaArrayDummy);
    const regex = /([ATCG])\1{3}/g;
    const result = getMutations(matrix, regex);
    expect(result).toBe(0);
  });
  it('Should check is a dna belongs to a mutant, false result', () => {
    const result = isMutant(dnaArrayDummy);
    expect(result).toBe(false);
  });
  it('Should check is a dna belongs to a mutant, true result', () => {
    const result = isMutant(dnaArraySuccess);
    expect(result).toBe(true);
  });
});
