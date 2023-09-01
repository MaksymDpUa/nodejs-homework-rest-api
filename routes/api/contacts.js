const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts.js");

const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../../schemas/contactsSchema");

const router = express.Router();


router.get("/", async (req, res, next) => {
  try {
    const contactList = await listContacts();
    console.log(contactList);
    res.status(200).json(contactList);
  } catch (error) {
    next(error);
  }
});


router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.post("/", async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (typeof error !== "undefined") {
      res.status(400).send(error.details[0].message);
      return;
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);

    res.status(200).json({ message: `Contact deleted` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (typeof error !== "undefined") {
      res.status(400).send(error.details[0].message);
      return;
    }
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = updateStatusSchema.validate(req.body);
    if (typeof error !== "undefined") {
      res.status(404).send(error.details[0].message);
      return;
    }
    const { contactId } = req.params;
    const updatedContact = await updateStatusContact(contactId, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
