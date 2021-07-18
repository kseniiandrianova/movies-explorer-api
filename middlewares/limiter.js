const limit = require('express-rate-limit');

module.exports.limiter = limit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});