const limit = require('express-rate-limit');

module.exports.limiter = limit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
