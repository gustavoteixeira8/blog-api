"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonWebTokenProvider = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = require("../../../../config/auth");

class JsonWebTokenProvider {
  constructor() {
    this.jwtConfig = _auth.authConfig.jwt;
  }

  sign(payload, options) {
    return (0, _jsonwebtoken.sign)(payload, this.jwtConfig.secretKey, options);
  }

  verify(token) {
    return (0, _jsonwebtoken.verify)(token, this.jwtConfig.secretKey);
  }

}

exports.JsonWebTokenProvider = JsonWebTokenProvider;