const { logger } = require("./logger");

const createMatrix = (dnaArray) => {
  const matrix = [];

  dnaArray.forEach((actual) => {
    matrix.push(actual.split(""));
  });

  return matrix;
};

const isSafe = (x, y, size) => {
  if (x >= 0 && x < size && y >= 0 && y < size) {
    return true;
  }
  return false;
};

const checkCounter = (counter) => {
  if (counter >= 2) {
    return true;
  }
  return false;
};

const checkOblique = (mutations, regex) => {
  let mutationsCounter = 0;

  const { principal, second, third } = mutations;

  if (isMutationPresent(principal, regex)) {
    mutationsCounter++;
  }

  if (isMutationPresent(second, regex)) {
    mutationsCounter++;
  }

  if (isMutationPresent(third, regex)) {
    mutationsCounter++;
  }

  return mutationsCounter;
};

const getMutations = (matrix, regex) => {
  const oblique = [];
  const obliqueSecond = [];
  const obliqueThird = [];

  let mutationsCounter = 0;

  let column = [];
  let row = [];

  for (let i = 0; i < matrix.length; i++) {
    oblique.push(matrix[i][i]);

    if (isSafe(i, i + 1)) {
      obliqueSecond.push(matrix[i + 1][i]);
    }
    if (isSafe(i, i + 2)) {
      obliqueThird.push(matrix[i + 2][i]);
    }

    for (let j = 0; j < matrix.length; j++) {
      column.push(matrix[j][i]);
      row.push(matrix[i][j]);
    }

    if (isMutationPresent(column, regex)) {
      mutationsCounter++;
    }

    if (isMutationPresent(row, regex)) {
      mutationsCounter++;
    }

    if (checkCounter(mutationsCounter)) {
      return mutationsCounter;
    }

    column = [];
    row = [];
  }

  const obliques = {
    principal: oblique,
    second: obliqueSecond,
    third: obliqueThird,
  };

  mutationsCounter += checkOblique(obliques, regex);
  return mutationsCounter;
};

const isMutationPresent = (dna, regex) => {
  if (dna.join("").match(regex)) {
    return true;
  }
};

const isMutant = (dna) => {
  const regex = /([ATCG])\1{3}/g;
  const matrix = createMatrix(dna);
  const mutationsCounter = getMutations(matrix, regex);

  if (checkCounter(mutationsCounter)) {
    return true;
  }

  return false;
};

module.exports = {
  isMutationPresent,
  isMutant,
  getMutations,
  checkCounter,
  checkOblique,
  isSafe,
  createMatrix,
};
