"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Identifier = void 0;

var _uuid = require("uuid");

var _ValueObjectProtocol = require("./ValueObjectProtocol");

class Identifier extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(id) {
    return new Identifier(id || (0, _uuid.v4)());
  }

}

exports.Identifier = Identifier;