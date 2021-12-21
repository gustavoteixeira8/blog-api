"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForeignKeyId = void 0;

var _errors = require("../../errors");

var _isUUID = _interopRequireDefault(require("validator/lib/isUUID"));

var _ValueObjectProtocol = require("./ValueObjectProtocol");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ForeignKeyId extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(id) {
    if (!this.validate(id)) {
      return new _errors.InvalidForeignKeyError();
    }

    return new ForeignKeyId(id);
  }

  static validate(id) {
    return (0, _isUUID.default)(id, 'all');
  }

}

exports.ForeignKeyId = ForeignKeyId;