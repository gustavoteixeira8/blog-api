"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenJWT = void 0;

var _isJWT = _interopRequireDefault(require("validator/lib/isJWT"));

var _ValueObjectProtocol = require("./ValueObjectProtocol");

var _errors = require("../../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TokenJWT extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(token) {
    if (!this.validate(token)) {
      return new _errors.InvalidTokenError();
    }

    return new TokenJWT(token);
  }

  static validate(token) {
    return (0, _isJWT.default)(token);
  }

}

exports.TokenJWT = TokenJWT;