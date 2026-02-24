const HTTP_STATUS = {
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  CREATED: 201,
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
};

const ERROR_MESSAGES = {
  NOT_FOUND: "Requested resource not found",
};

module.exports = { HTTP_STATUS, ERROR_MESSAGES };