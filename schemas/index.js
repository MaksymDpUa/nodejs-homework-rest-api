const { registerSchema, loginSchema } = require('./usersSchema');
const { addContactSchema, updateContactSchema, updateContactFavoriteSchema } = require('./contactsSchema');

module.exports = {
  registerSchema,
  loginSchema,
  addContactSchema,
  updateContactSchema,
  updateContactFavoriteSchema,
};
