const Joi = require('joi');

const mutantSchema = Joi.object().keys({
  dna: Joi.array(),
}).options({ abortEarly: false });

module.exports = { mutantSchema };
