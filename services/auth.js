const { User } = require('../models/user');
const { HttpError } = require('../utils');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const register = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  return await User.create({ ...body, password: hashPassword });
};

const login = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  // return loginedUser
};

// const getContactById = async (contactId) => {
//   const findedContact = await Contact.findById(contactId);
//   if (!findedContact) {
//     throw new HttpError(404);
//   }
//   return findedContact;
// };

// const removeContact = async (contactId) => {
//   const deletedContact = await Contact.findByIdAndRemove(contactId);
//   if (!deletedContact) {
//     throw new HttpError('This contact does not exist');
//   }
//   return deletedContact;
// };

// const addContact = async (body, owner) => {
//   return await Contact.create({ ...body, owner });
// };

// const updateContact = async (contactId, body) => {
//   const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
//     new: true,
//   });
//   if (!updatedContact) {
//     throw new HttpError('This contact does not exist');
//   }
//   return updatedContact;
// };

// const updateStatusContact = async (ContactId, body) => {
//   const updatedContact = await Contact.findByIdAndUpdate(ContactId, body, {
//     new: true,
//   });
//   if (!updatedContact) {
//     throw new HttpError(404);
//   }
//   return updatedContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
//   updateStatusContact,
// };

module.exports = {
  register,
};
