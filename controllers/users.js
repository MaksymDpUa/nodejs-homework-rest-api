const { register, login, logout, updateSubscription, updateAvatar } = require('../services');

const registerController = async (req, res, next) => {
  try {
    const newUser = await register(req.body);
    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getCurrentController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logoutController = async (req, res, next) => {
  try {
    await logout(req.user);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateSubscriptionController = async (req, res, next) => {
  try {
    const updatedUser = await updateSubscription(req.user, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const updateAvatarController = async (req, res, next) => {
  try {
    const avatarURL = await updateAvatar(req);
    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  updateSubscriptionController,
  updateAvatarController,
};
