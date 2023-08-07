const CustomAPIError = require("./custom-api");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");

// Export all Errors from a single file

module.exports = {
  CustomAPIError,
  NotFoundError,
  BadRequestError,
};
