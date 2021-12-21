"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueObjectProtocol = void 0;

class ValueObjectProtocol {
  constructor(_value) {
    this._value = _value;
  }

  get value() {
    return this._value;
  }

  equals(object) {
    if (object === null || object === undefined) return false;
    if (this._value === undefined) return false;
    if (JSON.stringify(object.value) !== JSON.stringify(this._value)) return false;
    return true;
  }

}

exports.ValueObjectProtocol = ValueObjectProtocol;