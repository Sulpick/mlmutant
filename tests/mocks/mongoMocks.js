const mockInsertOne = {
  collection: jest.fn(() => ({
    insertOne: jest.fn(() => (Promise.resolve(['This is a test :)', 'Dummy ops']))),
  })),
};

const mockFindOne = {
  collection: jest.fn(() => ({
    findOne: jest.fn(() => Promise.resolve({ result: 'This is a test :)' })),
  })),
};

const mockFound = {
  collection: jest.fn(() => ({
    findOne: jest.fn(() => Promise.resolve({ result: 'This is a test :)' })),
  })),
};

const mockNotFound = {
  collection: jest.fn(() => ({
    findOne: jest.fn(() => Promise.resolve(null)),
    insertOne: jest.fn(() => (Promise.resolve({ ops: ['This is a test :)', 'Dummy ops'] }))),

  })),
};
module.exports = {
  mockInsertOne,
  mockFindOne,
  mockFound,
  mockNotFound,
};
