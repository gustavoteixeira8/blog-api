"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnauthorizedError = exports.TooManyRequestsError = exports.NotFoundError = exports.InternalServerError = exports.HttpError = exports.ForbiddenError = exports.BadRequestError = void 0;

class HttpError extends Error {
  constructor(...errors) {
    super();
    this.status = void 0;
    this.name = void 0;
    this.errors = void 0;
    this.errors = errors;
    Error.captureStackTrace(this);
    Object.assign(Error.prototype, HttpError.prototype);
  }

}

exports.HttpError = HttpError;

class BadRequestError extends HttpError {
  constructor(...args) {
    super(...args);
    this.status = 400;
    this.name = 'BadRequestError';
  }

}

exports.BadRequestError = BadRequestError;

class NotFoundError extends HttpError {
  constructor(...args) {
    super(...args);
    this.status = 404;
    this.name = 'NotFoundError';
  }

}

exports.NotFoundError = NotFoundError;

class UnauthorizedError extends HttpError {
  constructor(...args) {
    super(...args);
    this.status = 401;
    this.name = 'UnauthorizedError';
  }

}

exports.UnauthorizedError = UnauthorizedError;

class ForbiddenError extends HttpError {
  constructor(...args) {
    super(...args);
    this.status = 403;
    this.name = 'ForbiddenError';
  }

}

exports.ForbiddenError = ForbiddenError;

class TooManyRequestsError extends HttpError {
  constructor(...args) {
    super(...args);
    this.status = 429;
    this.name = 'TooManyRequestsError';
  }

}

exports.TooManyRequestsError = TooManyRequestsError;

class InternalServerError extends HttpError {
  constructor() {
    super('Internal server error');
    this.status = 500;
    this.name = 'InternalServerError';
  }

}

exports.InternalServerError = InternalServerError;