"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthentication = ensureAuthentication;

var _tsyringe = require("tsyringe");

var _JsonWebTokenProvider = require("../../../providers/tokenProvider/implementations/JsonWebTokenProvider");

var _httpErrors = require("../errors/httpErrors");

function ensureAuthentication(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new _httpErrors.UnauthorizedError('Authorization must me provided');
  }

  const [, tokenJWT] = authorization.split(' ');

  if (!tokenJWT) {
    throw new _httpErrors.UnauthorizedError('Invalid token');
  }

  const tokenProvider = _tsyringe.container.resolve(_JsonWebTokenProvider.JsonWebTokenProvider);

  try {
    const {
      id
    } = tokenProvider.verify(tokenJWT);
    req.userData = {
      userId: id
    };
  } catch (err) {
    throw new _httpErrors.UnauthorizedError('Invalid token');
  }

  return next();
}