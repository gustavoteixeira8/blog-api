"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SharpProvider = void 0;

var _log = require("../../../log");

var _fs = _interopRequireDefault(require("fs"));

var _path = require("path");

var _sharp = _interopRequireDefault(require("sharp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SharpProvider {
  async convertToWebp(filepath) {
    const oldFilepath = (0, _path.resolve)(filepath);
    const filename = (0, _path.basename)(oldFilepath);
    const [filenameWithoutExt] = filename.split('.');
    const newFilepath = filepath.replace(filename, `${filenameWithoutExt}.webp`);

    try {
      await _fs.default.promises.access(oldFilepath);
      await (0, _sharp.default)(oldFilepath).webp().toFile(newFilepath);
      await _fs.default.promises.unlink(oldFilepath);
    } catch (error) {
      _log.logger.error(error);

      throw new Error('Image processor error');
    }

    return newFilepath;
  }

}

exports.SharpProvider = SharpProvider;