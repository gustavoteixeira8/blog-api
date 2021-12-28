"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SanitizeHtmlProvider = void 0;

var _sanitizeHtml = _interopRequireDefault(require("sanitize-html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SanitizeHtmlProvider {
  sanitize(value) {
    if (typeof value !== 'string') return value;
    return (0, _sanitizeHtml.default)(value);
  }

}

exports.SanitizeHtmlProvider = SanitizeHtmlProvider;