"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonName = void 0;

var _errors = require("../../errors");

var _ValueObjectProtocol = require("./ValueObjectProtocol");

class PersonName extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(name) {
    if (!this.validate(name)) {
      return new _errors.InvalidFullNameError();
    }

    const nameFormatted = this.format(name);
    return new PersonName(nameFormatted);
  }

  static format(name) {
    const nameSplitted = name.toLowerCase().trim().split(' ');

    for (const i in nameSplitted) {
      const nameFormatted = nameSplitted[i][0].toUpperCase() + nameSplitted[i].substring(1);
      nameSplitted[i] = nameFormatted;
    }

    return nameSplitted.join(' ');
  }

  static validate(name) {
    if (typeof name !== 'string') return false;
    const nameTrim = name.trim();
    const checkLength = nameTrim.length > 1 && nameTrim.length < 255;
    const mustHaveCharUpperAndLowerCase = /^[a-zá-ýA-ZÁ-Ý ]+$/.test(name);
    return checkLength && mustHaveCharUpperAndLowerCase;
  }

}

exports.PersonName = PersonName;