const { User } = require('../models/user');
const { HttpError } = require('../utils');
const bcrypt = require('bcrypt');
const fs = require('fs/promises');
const gravatar = require('gravatar');
const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const jimp = require('jimp');
const path = require('path');

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  return await User.create({ ...body, password: hashPassword, avatarURL });
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

const updateAvatar = async (req) => {
  const { _id } = req.user;
  if (!req.file) {
    throw new HttpError(401);
  }
  const { path: tmpUpload, originalname } = req.file;
  const img = await jimp.read(tmpUpload);
  await img.autocrop().cover(250, 250).writeAsync(tmpUpload);
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  return avatarURL;
};

module.exports = {
  register,
  login,
  logout,
  updateSubscription,
  updateAvatar,
};
