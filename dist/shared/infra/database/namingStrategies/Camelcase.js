"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CamelcaseStrategy = void 0;

var _camelcase = _interopRequireDefault(require("camelcase"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CamelcaseStrategy extends _typeorm.DefaultNamingStrategy {
  columnName(propertyName) {
    return (0, _camelcase.default)(propertyName);
  }

  tableName(targetName, userSpecifiedName) {
    if (userSpecifiedName) {
      return (0, _camelcase.default)(userSpecifiedName);
    }

    return (0, _camelcase.default)(targetName);
  }

}

exports.CamelcaseStrategy = CamelcaseStrategy;