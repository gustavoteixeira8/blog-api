"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiskStorageProvider = void 0;

var _log = require("../../../log");

var _fs = _interopRequireDefault(require("fs"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorageProvider {
  constructor() {
    this._tempPath = (0, _path.resolve)('temp');
    this._uploadPath = (0, _path.resolve)('uploads');
  }

  async save(filename, filetype) {
    const oldPath = (0, _path.resolve)(this._tempPath, filename);
    const newPath = (0, _path.resolve)(this._uploadPath, filetype, filename);

    try {
      await _fs.default.promises.access(oldPath);
      await _fs.default.promises.rename(oldPath, newPath);
    } catch (error) {
      _log.logger.error(error);

      throw new Error('Storage provider error');
    }

    return {
      location: newPath,
      filename
    };
  }

  async delete(filename, filetype) {
    const filePath = (0, _path.resolve)(this._uploadPath, filetype, filename);

    try {
      await _fs.default.promises.access(filePath);
      await _fs.default.promises.unlink(filePath);
    } catch (error) {
      _log.logger.error(error);

      throw new Error('Storage provider error');
    }
  }

}

exports.DiskStorageProvider = DiskStorageProvider;