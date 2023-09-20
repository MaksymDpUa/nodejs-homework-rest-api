require('dotenv').config();
const nodemailer = require('nodemailer');
const { MAILTRAP_USER, MAILTRAP_PASSWORD, MAILTRAP_HOST } = process.env;

const transport = nodemailer.createTransport({
  host: MAILTRAP_HOST,
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
});


const sendEmail = async (emailData) => {
  const email = { ...emailData, from: 'bogdan.lyamzin.d@gmail.com' };
  return transport.sendMail(email);
};

module.exports = { sendEmail };

