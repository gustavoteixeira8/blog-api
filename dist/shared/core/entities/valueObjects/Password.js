"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Password = void 0;

var _errors = require("../../errors");

var _isStrongPassword = _interopRequireDefault(require("validator/lib/isStrongPassword"));

var _ValueObjectProtocol = require("./ValueObjectProtocol");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Password extends _ValueObjectProtocol.ValueObjectProtocol {
  constructor(value, _isHash = false) {
    super(value);
    this._isHash = _isHash;
  }

  get isHash() {
    return this._isHash;
  }

  static create(password, isHash = false) {
    if (!this.validate(password, isHash)) {
      return new _errors.InvalidPasswordError();
    }

    return new Password(password, isHash);
  }

  static validate(password, isHash = false) {
    if (isHash) return true;
    return (0, _isStrongPassword.default)(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    });
  }

}

exports.Password = Password;