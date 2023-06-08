const { CustomAPIError } = require("../utils/customApiError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "something went wrong" });
};

module.exports = errorHandlerMiddleware;
