//making a custom error class to override default custom error handling
class customApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const customErrorFunc = (msg, code) => {
  return new customApiError(msg, code);
};

module.exports = { customErrorFunc, customApiError };
