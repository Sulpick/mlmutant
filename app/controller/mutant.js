const { isMutant } = require('../services/mutant');
const { findAndInsert } = require('../utils/database');
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
    ctx.status = 400;
    return ctx;
  }

  try {
    const { dna } = body;
    if (isMutant(dna)) {
      const result = await findAndInsert('mutants', dna);
      ctx.status = 200;
      ctx.body = { information: result };
    } else {
      ctx.status = 403;
      const result = await findAndInsert('humans', dna);
      ctx.body = { information: result };
    }

    return ctx;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  mutant,
};
