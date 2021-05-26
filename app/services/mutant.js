const isMutationPresent = (dna, regex) => {
  if (dna.join('').match(regex)) {
    return true;
  }
  return false;
};

const createMatrix = (dnaArray) => {
  const matrix = [];

  dnaArray.forEach((actual) => {
    matrix.push(actual.split(''));
  });

  return matrix;
};

const isSafe = (x, y, size) => {
  if (x >= 0 && x < size && y >= 0 && y < size) {
    return true;
  }
  return false;
};

const checkOblique = (mutations, regex) => {
  let mutationsCounter = 0;

  const { principal, second, third } = mutations;

  if (isMutationPresent(principal, regex)) {
    mutationsCounter += 1;
  }

  if (isMutationPresent(second, regex)) {
    mutationsCounter += 1;
  }

  if (isMutationPresent(third, regex)) {
    mutationsCounter += 1;
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

  for (let i = 0; i < matrix.length; i += 1) {
    oblique.push(matrix[i][i]);

    if (isSafe(i, i + 1)) {
      obliqueSecond.push(matrix[i + 1][i]);
    }
    if (isSafe(i, i + 2)) {
      obliqueThird.push(matrix[i + 2][i]);
    }

    for (let j = 0; j < matrix.length; j += 1) {
      column.push(matrix[j][i]);
      row.push(matrix[i][j]);
    }

    if (isMutationPresent(column, regex)) {
      mutationsCounter += 1;
    }

    if (isMutationPresent(row, regex)) {
      mutationsCounter += 1;
    }

    if (mutationsCounter > 2) {
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

const isMutant = (dna) => {
  const regex = /([ATCG])\1{3}/g;
  const matrix = createMatrix(dna);
  const mutationsCounter = getMutations(matrix, regex);

  if (mutationsCounter > 2) {
    return true;
  }

  return false;
};

module.exports = {
  isMutationPresent,
  isMutant,
  getMutations,
  checkOblique,
  isSafe,
  createMatrix,
};
