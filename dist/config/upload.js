"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadProviderConfig = exports.uploadConfig = void 0;

var _httpErrors = require("../shared/infra/http/errors/httpErrors");

var _multer = require("multer");

var _path = require("path");

var _crypto = require("crypto");

const uploadConfig = {
  tempPath: (0, _path.resolve)(__dirname, '..', '..', 'temp'),
  uploadPath: (0, _path.resolve)(__dirname, '..', '..', 'uploads'),
  multer: {
    storage: (0, _multer.diskStorage)({
      destination(req, file, cb) {
        cb(null, (0, _path.resolve)(uploadConfig.tempPath));
      },

      filename(req, file, cb) {
        const hash = (0, _crypto.randomBytes)(10).toString('hex');
        cb(null, `${Date.now()}_${hash}${(0, _path.extname)(file.originalname)}`);
      }

    }),
    limits: {
      fileSize: 2 * (1024 * 1024)
    },

    fileFilter(req, file, cb) {
      const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];

      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
        return;
      }

      cb(new _httpErrors.BadRequestError('The supported types are jpeg, png, gif, bmp, webp'));
    }

  }
};
exports.uploadConfig = uploadConfig;
const uploadProviderConfig = {
  cloudinary: {
    cloudinaryLocation: process.env.CLOUDINARY_LOCATION_FILE,
    cloudinaryOptions: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    }
  }
};
exports.uploadProviderConfig = uploadProviderConfig;