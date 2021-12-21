"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slug = void 0;

var _errors = require("../../errors");

var _isSlug = _interopRequireDefault(require("validator/lib/isSlug"));

var _ValueObjectProtocol = require("./ValueObjectProtocol");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Slug extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(slug) {
    if (!this.validate(slug)) {
      return new _errors.InvalidSlugError();
    }

    return new Slug(slug);
  }

  static validate(slug) {
    return (0, _isSlug.default)(slug);
  }

}

exports.Slug = Slug;