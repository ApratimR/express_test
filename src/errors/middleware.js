const { http_status_code } = require('../common/constants');
const { generate_body } = require('../common/functions');
const { logger } = require('../common/logger');
const BaseError = require('./baseError');



const errorHandlerMiddleware = (err, req, res, next) => {
  const errorDetails = {
    message: err.message,
    statusCode: err.statusCode || 500,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    ip: req.ip
  };

  if (err instanceof BaseError) {
    logger.error(errorDetails);
    return generate_body(res,err.statusCode,http_status_code[err.statusCode],{message:err.message})
  } else {
    logger.error({
      ...errorDetails,
      message: 'Internal Server Error',
      error: err.message
    });
    return generate_body(res,500,http_status_code[500],{message:http_status_code[500]})
  }
};

module.exports = errorHandlerMiddleware;
