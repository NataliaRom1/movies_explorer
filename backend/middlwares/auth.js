const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/UnauthorizedError');
const { NODE_ENV, JWT_SECRET, DEV_SECRET } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Need authentication'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Need authentication'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
