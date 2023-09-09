const express = require('express');
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
} = require('../../controllers/contacts.js');
const { addContactSchema, updateContactSchema, updateContactFavoriteSchema } = require('../../schemas');
const { validateBody, authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, listContactsController);

router.get('/:contactId', authenticate, getContactByIdController);

router.post('/', authenticate, validateBody(addContactSchema), addContactController);

router.delete('/:contactId', authenticate, removeContactController);

router.put('/:contactId', authenticate, validateBody(updateContactSchema), updateContactController);

router.patch(
  '/:contactId/favorite',
  authenticate, validateBody(updateContactFavoriteSchema),
  updateStatusContactController
);

module.exports = router;
