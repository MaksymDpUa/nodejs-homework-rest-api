const { Contact } = require('../models/contact');
const { HttpError } = require('../utils');

const listContacts = async (owner, query) => {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;
  const contactList = await Contact.find({ owner }, '-createdAt -updatedAt ', { skip, limit }).populate(
    'owner',
    'name email'
  );
  return contactList;
};

const getContactById = async (contactId) => {
  const findedContact = await Contact.findById(contactId);
  if (!findedContact) {
    throw new HttpError(404);
  }
  return findedContact;
};

const removeContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw new HttpError('This contact does not exist');
  }
  return deletedContact;
};

const addContact = async (body, owner) => {
  return await Contact.create({ ...body, owner });
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updatedContact) {
    throw new HttpError('This contact does not exist');
  }
  return updatedContact;
};

const updateStatusContact = async (ContactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(ContactId, body, {
    new: true,
  });
  if (!updatedContact) {
    throw new HttpError(404);
  }
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
