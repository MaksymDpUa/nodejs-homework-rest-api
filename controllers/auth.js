const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { HttpError } = require('../utils');
const { register } = require('../services/auth');
const { SECRET_KEY } = process.env;

const registerController = async (req, res, next) => {
  // const { email, password } = req.body;
  try {
    // const user = await User.findOne({ email });

    // if (user) {
    //   throw new HttpError(409, 'Email in use');
    // }

    // const hashPassword = await bcrypt.hash(password, 10);

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
  const { email, password } = req.body;

  try {
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

    res.json({
      token,
      user: {
        email: user.email,
        user: user.subscription,
      },
    });
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
  const { _id } = req.user;
  try {
    const findedUser = await User.findByIdAndUpdate(_id, { token: '' });
    if (!findedUser) {
      throw new HttpError(401);
    }
    // res.status(204).json({
    //   message: 'No content',
    // });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
};
