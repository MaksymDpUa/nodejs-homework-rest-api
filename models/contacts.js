const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, "./contacts.json");

async function read() {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}


function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}


const listContacts = async () => {
    const data = await read();
    return data;
}


const getContactById = async (contactId) => {
    const contactList = await read();
    const findedContact = contactList.find(
      (contact) => contact.id === contactId
    );
    if (!findedContact) {
      throw new Error("Not found");
    }
    return findedContact;
}


const removeContact = async (contactId) => {
    const contactList = await read();
    const index = contactList.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      throw new Error("Not found");
    }
    const deletedContact = contactList.splice(index, 1);
    await write(contactList);
    return deletedContact;
}


const addContact = async (body) => {
    const contactList = await read();
    const newContact = { ...body, id: crypto.randomUUID() };
    contactList.push(newContact);
    await write(contactList);
    return newContact;
}


const updateContact = async (contactId, body) => {
    const contactList = await read();
    const index = contactList.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      throw new Error("Not found");
  }
  if (!body) {
    throw new Error("missing fields");
  }
  console.log(body);
    contactList[index] = { ...contactList[index], ...body };
    await write(contactList);
    return contactList[index];
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
