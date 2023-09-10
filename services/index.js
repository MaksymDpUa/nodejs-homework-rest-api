const { register, login, logout, updateSubscription } = require('./users');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('./contacts');

module.exports = {
  register,
  login,
  logout,
  updateSubscription,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
