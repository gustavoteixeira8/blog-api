"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _pino = _interopRequireDefault(require("pino"));

var _logger = require("../../config/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _pino.default)({ ..._logger.loggerConfig
});
exports.logger = logger;