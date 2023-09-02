const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../services/contacts.js");


const listContactsController = async (req, res, next) => {
  try {
    const contactList = await listContacts();
    res.status(200).json(contactList);
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const removeContactController = async (req, res) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);
    res.status(200).json({ message: `Contact deleted` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addContactController = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).send(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStatusContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateStatusContact(contactId, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
