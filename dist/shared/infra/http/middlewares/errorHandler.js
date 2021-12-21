"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = errorHandler;

var _convertErrorsToHttpError = require("../errors/convertErrorsToHttpError");

var _errors = require("../../../core/errors");

var _httpErrors = require("../errors/httpErrors");

var _httpResponses = require("../utils/httpResponses");

var _log = require("../../../log");

function errorHandler(error, req, res, next // eslint-disable-line
) {
  _log.logger.error(error);

  if (error instanceof _httpErrors.HttpError) {
    return (0, _httpResponses.errorResponse)(res, {
      errors: error.errors,
      status: error.status
    });
  }

  if (error instanceof _errors.EntityError) {
    return (0, _httpResponses.errorResponse)(res, {
      errors: error.messages,
      status: 400
    });
  }

  const handleError = (0, _convertErrorsToHttpError.convertErrorsToHttpError)(error);
  return (0, _httpResponses.errorResponse)(res, {
    errors: handleError.errors,
    status: handleError.status
  });
}