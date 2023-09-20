const { User } = require('../models/user');
const { HttpError } = require('../utils');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const fs = require('fs/promises');
const gravatar = require('gravatar');
const { SECRET_KEY, BASE_URL } = process.env;
const { sendEmail } = require('../helpers/sendEmail');
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
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();
  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `
        <h1>To confirm your registration, please click on link below</h1>
        <p>
          <a href="${BASE_URL}/api/users/verify/${verificationToken}">Click me</a>
        </p>
      `,
    text: `
        To confirm your registration, please click on link below\n
        ${BASE_URL}/api/users/verify/${verificationToken}
      `,
  };
  await sendEmail(verifyEmail);
  return await User.create({ ...body, password: hashedPassword, avatarURL, verificationToken });
};

const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
};

const resendVerifyEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Email not found');
  }
  if (user.verify) {
    throw new HttpError(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `
        <h1>To confirm your registration, please click on link below</h1>
        <p>
          <a href="${BASE_URL}/api/users/verify/${verifyToken}">Click me</a>
        </p>
      `,
    text: `
        To confirm your registration, please click on link below\n
        ${BASE_URL}/api/users/verify/${verifyToken}
      `,
  };
  await sendEmail(verifyEmail);
};

const login = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  if (!user.verify) {
    throw new HttpError(401, 'Email not verified');
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
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  updateSubscription,
  updateAvatar,
};
