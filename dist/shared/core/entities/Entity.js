"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = void 0;

var _Identifier = require("./valueObjects/Identifier");

class Entity {
  get id() {
    return this._id;
  }

  constructor(props) {
    this._id = void 0;
    this._id = props.id || _Identifier.Identifier.create();
  }

  equals(object) {
    if (object === null || object === undefined) return false;
    if (this !== object) return false;
    if (this._id !== object.id) return false;
    return true;
  }

}

exports.Entity = Entity;