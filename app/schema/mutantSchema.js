const Joi = require('joi');

const mutantSchema = Joi.object().keys({
  dna: Joi.array().items(
    Joi.string().regex(/(((?![ATCG])\w+)|(\s))/).forbidden(),
  ).length(6),
}).options({ abortEarly: false });

module.exports = { mutantSchema };
