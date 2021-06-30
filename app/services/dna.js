const { logger } = require('./logger');
const { statusCodes } = require('../constants/httpStatus');

/* eslint-disable no-param-reassign */
const size = 6;
const words = ['AAAA', 'CCCC', 'TTTT', 'GGGG'];

const createMatrix = (dnaArray) => {
  const matrix = [];

  dnaArray.forEach((actual) => {
    if (actual.length !== 6) {
      const error = new Error();
      error.status = statusCodes.BAD_REQUEST;
      error.message = { cause: `Secuence ${actual} is not size 6` };
      throw error;
    }
    matrix.push(actual.split(''));
  });

  return matrix;
};

const solveDnaUtil = (dna, i, j, wordIndex, word) => {
  if (dna[i][j] !== word.charAt(wordIndex)) {
    return false;
  }

  if (wordIndex === word.length - 1) {
    return true;
  }

  const letter = dna[i][j];
  dna[i][j] = ' ';

  // izquierda
  if (i > 0) {
    if (solveDnaUtil(dna, i - 1, j, wordIndex + 1, word)) {
      return true;
    }
  }

  // arriba
  if (j > 0) {
    if (solveDnaUtil(dna, i, j - 1, wordIndex + 1, word)) {
      return true;
    }
  }

  // derecha
  if (i < dna.length - 1) {
    if (solveDnaUtil(dna, i + 1, j, wordIndex + 1, word)) {
      return true;
    }
  }

  // abajo
  if (j < dna.length - 1) {
    if (solveDnaUtil(dna, i, j + 1, wordIndex + 1, word)) {
      return true;
    }
  }

  // diagonal hacia arriba - derecha
  if (i + 1 < size && j - 1 >= 0) {
    if (solveDnaUtil(dna, i + 1, j - 1, wordIndex + 1, word)) {
      return true;
    }
  }

  // diagonal arriba - izquierda
  if (i - 1 >= 0 && j - 1 >= 0) {
    if (solveDnaUtil(dna, i - 1, j - 1, wordIndex + 1, word)) {
      return true;
    }
  }

  // diagonal abajo  - izquierda
  if (i - 1 >= 0 && j + 1 < size) {
    if (solveDnaUtil(dna, i - 1, j + 1, wordIndex + 1, word)) {
      return true;
    }
  }

  // diagonal abajo - derecha
  if (i + 1 < size && j + 1 < size) {
    if (solveDnaUtil(dna, i + 1, j + 1, wordIndex + 1, word)) {
      return true;
    }
  }

  dna[i][j] = letter;
  return false;
};

const solveDna = (dnaArray) => {
  const matrix = createMatrix(dnaArray);
  const exists = [];

  words.forEach((actual) => {
    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        if (solveDnaUtil(matrix, i, j, 0, actual)) {
          logger.info(`Solution for ${actual} exists`);
          exists.push(true);
        }
      }
    }
  });
  return exists;
};

module.exports = {
  solveDna,
};
