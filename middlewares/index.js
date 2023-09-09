const validateBody = require('./validateBody');
const notFoundHandler = require('./notFoundHandler');
const authenticate = require('./authenticate');
const clobalErrorHandler = require('./globalErrorHandler');

module.exports = {
  validateBody,
  notFoundHandler,
  authenticate,
  clobalErrorHandler,
};
