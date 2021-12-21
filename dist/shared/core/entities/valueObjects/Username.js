"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Username = void 0;

var _errors = require("../../errors");

var _ValueObjectProtocol = require("./ValueObjectProtocol");

class Username extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(username) {
    if (!this.validate(username)) {
      return new _errors.InvalidUsernameError();
    }

    const usernameFormatted = this.format(username);
    return new Username(usernameFormatted);
  }

  static format(username) {
    return username.split(' ').join('').trim();
  }

  static validate(username) {
    if (typeof username !== 'string') return false;
    const nameTrim = username.trim();
    const checkLength = nameTrim.length > 1 && nameTrim.length < 255;
    const alphanumericAndNonAlphanumeric = /^[\w\W]+$/.test(username);
    const notExistsSpace = nameTrim.split(' ').length <= 1;
    return checkLength && alphanumericAndNonAlphanumeric && notExistsSpace;
  }

}

exports.Username = Username;