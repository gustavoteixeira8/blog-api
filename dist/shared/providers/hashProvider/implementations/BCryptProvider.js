"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BCryptProvider = void 0;

var _bcrypt = require("bcrypt");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BCryptProvider {
  constructor() {
    _defineProperty(this, "defaultSalt", 8);
  }

  generate(s) {
    return (0, _bcrypt.hash)(s, this.defaultSalt);
  }

  compare(s, hash) {
    return (0, _bcrypt.compare)(s, hash);
  }

}

exports.BCryptProvider = BCryptProvider;