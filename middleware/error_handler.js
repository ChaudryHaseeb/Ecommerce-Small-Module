const { Constants } = require("../Constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case Constants.VALIDATION_ERROR:
      res.json({
        title: "Validation is not correct",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case Constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case Constants.UNAUTHORIZED:
      res.json({
        title: "AUTHORIZATION is Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case Constants.FORBIDDEN:
      res.json({
        title: "forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case Constants.SERVER_ERROR:
      res.json({
        title: "Server is not responding",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log("all is good !");
      break;
  };
};
module.exports = errorHandler;