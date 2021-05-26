const safeIndex = {
  x: 2,
  y: 2,
  size: 3,
};

const unSafeIndex = {
  x: 2,
  y: 2,
  size: 1,
};

const dnaArrayDummy = ['DUMMYS', 'DUMMYS', 'DUMMYS', 'DUMMYS', 'DUMMYS', 'DUMMYS'];

const dnaArraySuccess = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];

const obliqueFail = {
  principal: ['A', 'T', 'C', 'A', 'T', 'G'],
  second: ['C', 'T', 'C', 'C', 'T'],
  third: ['T', 'A', 'T', 'T'],
};

const obliqueSuccess = {
  principal: ['A', 'A', 'A', 'A', 'T', 'G'],
  second: ['C', 'C', 'C', 'C', 'T'],
  third: ['T', 'T', 'T', 'T'],
};

module.exports = {
  safeIndex,
  unSafeIndex,
  obliqueFail,
  obliqueSuccess,
  dnaArraySuccess,
  dnaArrayDummy,
};
