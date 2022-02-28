"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloudinaryStorageProvider = void 0;

var _cloudinary = require("cloudinary");

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _upload = require("../../../../config/upload");

var _log = require("../../../log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CloudinaryStorageProvider {
  constructor() {
    _defineProperty(this, "_cloudinaryConfig", _upload.uploadConfig.storageProvider.cloudinary);

    _defineProperty(this, "_tempPath", _upload.uploadConfig.tempPath);

    _cloudinary.v2.config(this._cloudinaryConfig);
  }

  async save(filename, filetype) {
    let response;

    try {
      response = await _cloudinary.v2.uploader.upload((0, _path.resolve)(this._tempPath, filename), {
        async: false,
        timestamp: Date.now(),
        use_filename: true,
        folder: 'blog',
        public_id: filename.split('.')[0],
        type: 'upload',
        resource_type: filetype
      });
      await _fs.default.promises.unlink((0, _path.resolve)(this._tempPath, filename));
    } catch (error) {
      _log.logger.error(error);

      throw new Error('Storage provider error');
    }

    return {
      filename,
      location: response.secure_url
    };
  }

  async delete(filename, filetype) {
    try {
      await _cloudinary.v2.uploader.destroy(`blog/${filename.split('.')[0]}`, {
        resource_type: filetype,
        type: 'upload',
        invalidate: true
      });
    } catch (error) {
      _log.logger.error(error);

      throw new Error('Storage provider error');
    }
  }

}

exports.CloudinaryStorageProvider = CloudinaryStorageProvider;