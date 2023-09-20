const { registerSchema, loginSchema, emailSchema, updateSubscriptionSchema } = require('./usersSchema');
const { addContactSchema, updateContactSchema, updateContactFavoriteSchema } = require('./contactsSchema');

module.exports = {
  registerSchema,
  loginSchema,
  emailSchema,
  addContactSchema,
  updateContactSchema,
  updateContactFavoriteSchema,
  updateSubscriptionSchema,
};
