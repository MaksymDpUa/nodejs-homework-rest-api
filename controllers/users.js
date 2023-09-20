const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  updateSubscription,
  updateAvatar,
} = require('../services');
const { controllerWrapper } = require('../utils');

const registerController = controllerWrapper(async (req, res, next) => {
  const newUser = await register(req.body);
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
});

const verifyEmailController = controllerWrapper(async (req, res) => {
  await verifyEmail(req.params.verificationToken);
  res.json({
    message: 'Verification successful',
  });
});

const resendVerifyEmailController = controllerWrapper(async (req, res) => {
  await resendVerifyEmail(req.body.email);
  res.json({
    message: 'Verification email sent',
  });
});

const loginController = controllerWrapper(async (req, res, next) => {
  const result = await login(req.body);
  res.status(200).json(result);
});

const getCurrentController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logoutController = controllerWrapper(async (req, res, next) => {
  await logout(req.user);
  res.status(204).end();
});

const updateSubscriptionController = controllerWrapper(async (req, res, next) => {
  const updatedUser = await updateSubscription(req.user, req.body);
  res.status(200).json(updatedUser);
});

const updateAvatarController = controllerWrapper(async (req, res, next) => {
  const avatarURL = await updateAvatar(req);
  res.status(200).json({
    avatarURL,
  });
});

module.exports = {
  registerController,
  verifyEmailController,
  resendVerifyEmailController,
  loginController,
  getCurrentController,
  logoutController,
  updateSubscriptionController,
  updateAvatarController,
};
