const { solveDna } = require('../services/dna');
const { findAndInsert } = require('../utils/database');
const { statusCodes } = require('../constants/httpStatus');
const { mutantSchema } = require('../schema/mutantSchema');
const { logger } = require('../services/logger');

// eslint-disable-next-line consistent-return
const mutant = async (ctx) => {
  const { body } = ctx.request;

  const validateBody = mutantSchema.validate(body);

  if (validateBody.error || ctx.request.body.length === 0) {
    const data = {
      cause: validateBody.error ? validateBody.error.message : 'Payload Empty',
    };
    ctx.body = data;
    ctx.status = statusCodes.BAD_REQUEST;
    return ctx;
  }

  try {
    const { dna } = body;
    const result = solveDna(dna);
    if (result.length >= 2) {
      const query = await findAndInsert('mutants', dna);
      ctx.status = statusCodes.OK;
      ctx.body = { type: 'mutant', information: query };
    } else {
      const query = await findAndInsert('humans', dna);
      ctx.body = { type: 'human', information: query };
      ctx.status = statusCodes.FORBIDDEN;
    }
    return ctx;
  } catch (error) {
    ctx.body = { msg: error.message };
    ctx.status = error.status ? error.status : statusCodes.INTERNAL_SERVER_ERROR;
    logger.error(error);
  }
};

module.exports = {
  mutant,
};
