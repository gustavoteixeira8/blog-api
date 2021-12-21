"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryName = void 0;

var _errors = require("../../errors");

var _ValueObjectProtocol = require("./ValueObjectProtocol");

class CategoryName extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(name) {
    const nameFormatted = this.format(name);

    if (!this.validate(name)) {
      return new _errors.InvalidCategoryNameError(nameFormatted);
    }

    return new CategoryName(nameFormatted);
  }

  static format(name) {
    return name.trim();
  }

  static validate(name) {
    if (typeof name !== 'string') return false;
    const nameTrim = name.trim();
    const checkLength = nameTrim.length >= 3 && nameTrim.length < 255;
    const alphanumericAndNonAlphanumeric = /^[\w\W]+$/.test(name);
    return checkLength && alphanumericAndNonAlphanumeric;
  }

}

exports.CategoryName = CategoryName;