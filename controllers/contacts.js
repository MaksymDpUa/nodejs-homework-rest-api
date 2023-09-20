const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../services');
const { controllerWrapper } = require('../utils');

const listContactsController = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const contactList = await listContacts(owner, req.query);
  res.status(200).json(contactList);
});

const getContactByIdController = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.status(200).json(contact);
});

const removeContactController = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.status(200).json({ message: `Contact deleted` });
});

const addContactController = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await addContact(req.body, owner);
  res.status(201).send(newContact);
});

const updateContactController = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  res.status(200).json(updatedContact);
});

const updateStatusContactController = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateStatusContact(contactId, req.body);
  res.status(200).json(updatedContact);
});

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
