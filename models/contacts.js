const { Contact } = require("./contact");


const listContacts = async () => {
  const contactList = await Contact.find();
  console.log(contactList);
  return contactList;
};


const getContactById = async (contactId) => {
  const findedContact = await Contact.findById(contactId);
  if (!findedContact) {
    throw new Error("Not found");
  }
  return findedContact;
};


const removeContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw new Error("Not found");
  }
  return deletedContact;
};


const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};


const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (updatedContact) {
    throw new Error("Not found");
  }
  return updatedContact;
};


const updateStatusContact = async (ContactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(ContactId, body, {
    new: true,
  });
  if (!updatedContact) {
    throw new Error("Not found");
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
