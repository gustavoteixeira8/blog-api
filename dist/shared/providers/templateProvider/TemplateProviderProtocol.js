"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateProviderProtocol = void 0;

var _path = require("path");

class TemplateProviderProtocol {
  normalizeFilePath(file) {
    return (0, _path.resolve)('src', 'modules', `${file.module}`, 'views', `${file.filename}.hbs`);
  }

}

exports.TemplateProviderProtocol = TemplateProviderProtocol;