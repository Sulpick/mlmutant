/* eslint-disable no-param-reassign */
const size = 6;

const createMatrix = (dnaArray) => {
  const matrix = [];

  dnaArray.forEach((actual) => {
    matrix.push(actual.split(''));
  });

  return matrix;
};

const printSolution = (solution) => {
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      console.log(` ${solution[i][j]} `);
    }
  }
};

const isSafe = (x, y) => {
  if (x >= 0 && x < size && y >= 0 && y < size) {
    return true;
  }
  return false;
};

const solveDnaUtil = (dna, x, y, solution) => {
  if (x === (size - 1) && y === (size - 1) && dna[x][y] === 1) {
    solution[x][y] = 1;
    return true;
  }

  if (isSafe(x, y) === true) {
    if (solution[x][y] === 1) {
      return false;
    }

    solution[x][y] = 1;

    if (solveDnaUtil(dna, x + 1, y, solution)) {
      return true;
    }

    if (solveDnaUtil(dna, x, y + 1, solution)) {
      return true;
    }

    if (solveDnaUtil(dna, x - 1, y, solution)) {
      return true;
    }

    if (solveDnaUtil(dna, x, y - 1, solution)) {
      return true;
    }

    solution[x][y] = 0;
    return false;
  }
  return false;
};

const solveDna = () => {
  const dnaArray = [
    'ATGCGA',
    'CAGTGC',
    'TTATGT',
    'AGAAGG',
    'CCCCTA',
    'TCACTG',
  ];

  const solutionArray = [
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
  ];

  const matrix = createMatrix(dnaArray);
  const solution = createMatrix(solutionArray);

  if (solveDnaUtil(matrix, 0, 0, solution) === false) {
    console.log('Solution does not exist');
    return false;
  }

  printSolution(solution);
  return true;
};

module.exports = {
  solveDna,
};
