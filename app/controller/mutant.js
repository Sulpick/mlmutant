const { isMutant } = require("../services/mutant");
const { searchAndInsert } = require("../utils/database");
const { logger } = require("../services/logger");

const mutant = async (ctx) => {
  const { body } = ctx.request;
  const { dna } = body;

  try {
    if (isMutant(dna)) {
      const result = await searchAndInsert(dna, "mutants");
      ctx.status = 200;
      ctx.body = { information: result };
    } else {
      ctx.status = 403;
      const result = await searchAndInsert(dna, "humans");
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
