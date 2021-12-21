"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandlebarsProvider = void 0;

var _log = require("../../../log");

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _TemplateProviderProtocol = require("../TemplateProviderProtocol");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HandlebarsProvider extends _TemplateProviderProtocol.TemplateProviderProtocol {
  async parse({
    file,
    variables
  }) {
    try {
      this.defineHelpers();
      const fileContent = await _fs.default.promises.readFile(this.normalizeFilePath(file), {
        encoding: 'utf8'
      });

      const parseContent = _handlebars.default.compile(fileContent);

      return parseContent(variables);
    } catch (error) {
      _log.logger.error(error);

      throw new Error('Template provider error');
    }
  }

  defineHelpers() {
    _handlebars.default.registerHelper('convertDate', value => {
      if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
        return new Date(value).toUTCString();
      }
    });
  }

}

exports.HandlebarsProvider = HandlebarsProvider;