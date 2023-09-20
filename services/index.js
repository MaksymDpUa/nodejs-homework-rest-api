const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  updateSubscription,
  updateAvatar,
} = require('./users');
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
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  updateSubscription,
  updateAvatar,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  updateAvatar,
};
