const HttpError = require('./HttpError');

const validateBody = (validationSchema) => {
  return (req, res, next) => {
    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(new HttpError(422, error));
    }
    next();
  };
};

module.exports = validateBody;
