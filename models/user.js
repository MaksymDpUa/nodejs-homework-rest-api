const { Schema, model } = require('mongoose');
const { emailRegexp, subscriptionList } = require('../utils');

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

module.exports = {
  User,
};
