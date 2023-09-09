const Joi = require('joi');
const { emailRegexp } = require('../utils');

const registerSchema = Joi.object({
//   name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

// const schemas = {
//   registerSchema,
//   loginSchema,
// };

module.exports = {
  registerSchema,
  loginSchema,
};