const { InternalServerErrorMessage } = require('../utils/errorMessages');

const errorHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500
      ? InternalServerErrorMessage
      : message,
  });
  next();
};

module.exports = errorHandler;
