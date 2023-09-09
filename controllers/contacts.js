const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../services/contacts.js');

// const getAll = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;
//   const result = await Book.find({ owner }, '-createdAt -updatedAt', { skip, limit }).populate('owner', 'name email');
//   res.json(result);
// };

const listContactsController = async (req, res, next) => {
  console.log(req.user);
  const { _id: owner } = req.user;
  try {
    const contactList = await listContacts(owner, req.query);
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
  const { _id: owner } = req.user;
  try {
    const newContact = await addContact(req.body, owner);
    res.status(201).send(newContact);
  } catch (error) {
    next(error);
  }
};
// const add = async (req, res) => {
//   const { _id: owner } = req.user;
//   const result = await Book.create({ ...req.body, owner });
//   res.status(201).json(result);
// };
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
