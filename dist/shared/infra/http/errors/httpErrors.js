"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnauthorizedError = exports.TooManyRequestsError = exports.NotFoundError = exports.InternalServerError = exports.HttpError = exports.ForbiddenError = exports.BadRequestError = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class HttpError extends Error {
  constructor(...errors) {
    super();

    _defineProperty(this, "status", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "errors", void 0);

    this.errors = errors;
    Error.captureStackTrace(this);
    Object.assign(Error.prototype, HttpError.prototype);
  }

}

exports.HttpError = HttpError;

class BadRequestError extends HttpError {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "status", 400);

    _defineProperty(this, "name", 'BadRequestError');
  }

}

exports.BadRequestError = BadRequestError;

class NotFoundError extends HttpError {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "status", 404);

    _defineProperty(this, "name", 'NotFoundError');
  }

}

exports.NotFoundError = NotFoundError;

class UnauthorizedError extends HttpError {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "status", 401);

    _defineProperty(this, "name", 'UnauthorizedError');
  }

}

exports.UnauthorizedError = UnauthorizedError;

class ForbiddenError extends HttpError {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "status", 403);

    _defineProperty(this, "name", 'ForbiddenError');
  }

}

exports.ForbiddenError = ForbiddenError;

class TooManyRequestsError extends HttpError {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "status", 429);

    _defineProperty(this, "name", 'TooManyRequestsError');
  }

}

exports.TooManyRequestsError = TooManyRequestsError;

class InternalServerError extends HttpError {
  constructor() {
    super('Internal server error');

    _defineProperty(this, "status", 500);

    _defineProperty(this, "name", 'InternalServerError');
  }

}

exports.InternalServerError = InternalServerError;