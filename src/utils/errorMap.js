const ERROR_MAP = {
    'LINK_NOT_FOUND': { message: 'Link not found.', statusCode: 404 },
    'LINK_EXPIRED': { message: 'Link has expired.', statusCode: 410 },
    'LINK_USED': { message: 'Link has been used already.', statusCode: 410 },
    'URL_NOT_FOUND': { message: 'An URL is required.', statusCode: 400 },
    'ALIAS_ALREADY_EXISTS': { message: 'The provided alias already exists. Please choose another one.', statusCode: 409 },
    'ALIAS_WRONG_LENGTH': { message: 'The alias length need to be between 4 and 10 characters. Please choose another one.', statusCode: 400 },
    'UNAUTHORIZED_TO_DELETE': { message: 'Unauthorized to delete this link.', statusCode: 403 },
    'INVALID_TOKEN': { message: 'Invalid or expired token.', statusCode: 401 },
  };
  
  module.exports = ERROR_MAP;