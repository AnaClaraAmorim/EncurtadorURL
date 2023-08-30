const ERROR_MAP = require('./errorMap');

class HttpError extends Error {
  constructor(key) {
    const errorInfo = ERROR_MAP[key] || { message: 'An unknow error occurred.', statusCode: 500 };
    super(errorInfo.message);
    this.statusCode = errorInfo.statusCode;
  }

  static fromKey(key) {
    return new HttpError(key);
  }
}

module.exports = HttpError;