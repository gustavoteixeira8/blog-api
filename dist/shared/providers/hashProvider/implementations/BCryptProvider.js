"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BCryptProvider = void 0;

var _bcrypt = require("bcrypt");

class BCryptProvider {
  constructor() {
    this.defaultSalt = 8;
  }

  generate(s) {
    return (0, _bcrypt.hash)(s, this.defaultSalt);
  }

  compare(s, hash) {
    return (0, _bcrypt.compare)(s, hash);
  }

}

exports.BCryptProvider = BCryptProvider;