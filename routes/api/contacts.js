const express = require('express');
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
} = require('../../controllers/contacts.js');
const {
  addContactSchema,
  updateContactSchema,
  updateContactFavoriteSchema,
} = require('../../schemas/contactsSchema.js');
const validateBody = require('../../utils/validateBody');

const router = express.Router();

router.get('/', listContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', validateBody(addContactSchema), addContactController);

router.delete('/:contactId', removeContactController);

router.put('/:contactId', validateBody(updateContactSchema), updateContactController);

router.patch('/:contactId/favorite', validateBody(updateContactFavoriteSchema), updateStatusContactController);

module.exports = router;
