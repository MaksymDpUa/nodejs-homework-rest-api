const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().positive().required(),
  });

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number().positive(),
});

module.exports = { addContactSchema, updateContactSchema };
