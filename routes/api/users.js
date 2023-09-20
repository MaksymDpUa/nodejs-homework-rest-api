const express = require('express');
const {
  registerController,
  verifyEmailController,
  resendVerifyEmailController,
  loginController,
  getCurrentController,
  logoutController,
  updateSubscriptionController,
  updateAvatarController,
} = require('../../controllers/users');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { registerSchema, emailSchema, loginSchema, updateSubscriptionSchema } = require('../../schemas');
const router = express.Router();

router.post('/register', validateBody(registerSchema), registerController);

router.get('/verify/:verificationToken', verifyEmailController);

router.post('/verify', validateBody(emailSchema), resendVerifyEmailController);

router.post('/login', validateBody(loginSchema), loginController);

router.get('/current', authenticate, getCurrentController);

router.post('/logout', authenticate, logoutController);

router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateSubscriptionController);

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatarController);

module.exports = router;
