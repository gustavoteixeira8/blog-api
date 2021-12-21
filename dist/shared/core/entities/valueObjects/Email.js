"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Email = void 0;

var _errors = require("../../errors");

var _isEmail = _interopRequireDefault(require("validator/lib/isEmail"));

var _ValueObjectProtocol = require("./ValueObjectProtocol");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Email extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(email) {
    if (!this.validate(email)) {
      return new _errors.InvalidEmailError();
    }

    const emailFormatted = this.format(email);
    return new Email(emailFormatted);
  }

  static format(email) {
    return email.trim().toLowerCase();
  }

  static validate(email) {
    return (0, _isEmail.default)(email);
  }

}

exports.Email = Email;