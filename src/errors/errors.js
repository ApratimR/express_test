const BaseError = require('./baseError');

class NotFoundError extends BaseError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

module.exports = {NotFoundError};
