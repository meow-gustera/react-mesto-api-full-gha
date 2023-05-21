const jwt = require('jsonwebtoken');
const ErrorStatusUnauthorized = require('../utilits/errorStatusUnauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorStatusUnauthorized('Нет хедера');
  }
  const { NODE_ENV, JWT_SECRET } = process.env;

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new ErrorStatusUnauthorized('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
