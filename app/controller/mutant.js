const { isMutant } = require('../services/mutant');
const { searchAndInsert } = require('../utils/database');
const { mutantSchema } = require('../schema/mutantSchema');

const mutant = async (ctx) => {
  const { body } = ctx.request;
  const validateBody = mutantSchema.validate(body);

  if (validateBody.error || ctx.request.body.length == 0) {
    const data = {
      cause: validateBody.error ? validateBody.error.message : 'Payload Empty',
    }
    ctx.body = data;
    ctx.status = 400;
    return ctx;
  }

  try {
    const { dna } = body;
    if (isMutant(dna)) {
      const result = await searchAndInsert(dna, 'mutants');
      ctx.status = 200;
      ctx.body = { information: result };
    } else {
      ctx.status = 403;
      const result = await searchAndInsert(dna, 'humans');
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
