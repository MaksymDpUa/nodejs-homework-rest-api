const { User } = require('../models/user');
const { HttpError } = require('../utils');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const register = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  return await User.create({ ...body, password: hashPassword });
};

const login = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });
  const response = {
    token,
    user: {
      email: user.email,
      user: user.subscription,
    },
  };

  return response;
};

const logout = async (user) => {
  const { _id } = user;
  const findedUser = await User.findByIdAndUpdate(_id, { token: '' });
  if (!findedUser) {
    throw new HttpError(401);
  }
};

const updateSubscription = async (user, subscription) => {
  const { _id } = user;
  const findedUser = await User.findByIdAndUpdate(_id, subscription, { new: true });
  if (!findedUser) {
    throw new HttpError(401);
  }
  return findedUser;
};

module.exports = {
  register,
  login,
  logout,
  updateSubscription,
};
