const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  // if (!token) {
  //   throw new AuthError('Необходима авторизация!');
  // }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
    req.user = payload;

    next();
  } catch (err) {
    throw new AuthError('Необходима авторизация!!');
  }
};
