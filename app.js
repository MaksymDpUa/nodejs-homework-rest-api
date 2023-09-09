const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use(notFoundHandler);

app.use(globalErrorHandler);

module.exports = app;
