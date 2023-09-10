const { registerSchema, loginSchema, updateSubscriptionSchema } = require('./usersSchema');
const { addContactSchema, updateContactSchema, updateContactFavoriteSchema } = require('./contactsSchema');

module.exports = {
  registerSchema,
  loginSchema,
  addContactSchema,
  updateContactSchema,
  updateContactFavoriteSchema,
  updateSubscriptionSchema,
};
