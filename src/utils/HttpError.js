const ErrorEnum = Object.freeze({
  LINK_NOT_FOUND: 'LINK_NOT_FOUND',
  LINK_EXPIRED: 'LINK_EXPIRED',
  LINK_USED: 'LINK_USED',
  URL_NOT_FOUND: 'URL_NOT_FOUND',
  ALIAS_ALREADY_EXISTS: 'ALIAS_ALREADY_EXISTS',
  ALIAS_WRONG_LENGTH: 'ALIAS_WRONG_LENGTH',
  UNAUTHORIZED_TO_DELETE: 'UNAUTHORIZED_TO_DELETE',
  INVALID_TOKEN: 'INVALID_TOKEN'
});

const ErrorMap = {
  [ErrorEnum.LINK_NOT_FOUND]: { message: 'Link not found.', statusCode: 404 },
  [ErrorEnum.LINK_EXPIRED]: { message: 'Link has expired.', statusCode: 410 },
  [ErrorEnum.LINK_USED]: { message: 'Link has been used already.', statusCode: 410 },
  [ErrorEnum.URL_NOT_FOUND]: { message: 'An URL is required.', statusCode: 400 },
  [ErrorEnum.ALIAS_ALREADY_EXISTS]: { message: 'The provided alias already exists. Please choose another one.', statusCode: 409 },
  [ErrorEnum.ALIAS_WRONG_LENGTH]: { message: 'The alias length need to be between 4 and 10 characters. Please choose another one.', statusCode: 400 },
  [ErrorEnum.UNAUTHORIZED_TO_DELETE]: { message: 'Unauthorized to delete this link.', statusCode: 403 },
  [ErrorEnum.INVALID_TOKEN]: { message: 'Invalid or expired token.', statusCode: 401 },
};

class HttpError extends Error {
  constructor(key) {
    const errorInfo = ErrorMap[key] || { message: 'An unexpected error occurred.', statusCode: 500 };
    super(errorInfo.message);
    this.statusCode = errorInfo.statusCode;
  }
}

module.exports = { HttpError, ErrorEnum };