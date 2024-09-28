const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
}


module.exports = errorHandler();