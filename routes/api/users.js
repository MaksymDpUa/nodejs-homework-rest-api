const express = require('express');

const {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  updateSubscriptionController,
} = require('../../controllers/users');

const { validateBody, authenticate } = require('../../middlewares');

const { registerSchema, loginSchema, updateSubscriptionSchema } = require('../../schemas');

const router = express.Router();

router.post('/register', validateBody(registerSchema), registerController);

router.post('/login', validateBody(loginSchema), loginController);

router.get('/current', authenticate, getCurrentController);

router.post('/logout', authenticate, logoutController);

router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateSubscriptionController);

module.exports = router;
