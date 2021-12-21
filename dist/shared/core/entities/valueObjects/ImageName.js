"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageName = void 0;

var _errors = require("../../errors");

var _ValueObjectProtocol = require("./ValueObjectProtocol");

class ImageName extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(image) {
    const imageFormatted = this.format(image);

    if (!this.validate(imageFormatted)) {
      return new _errors.InvalidImageNameError();
    }

    return new ImageName(imageFormatted);
  }

  static format(image) {
    return image.trim().toLowerCase();
  }

  static validate(image) {
    if (typeof image !== 'string') return false;
    const [, imageType] = image.split('.');
    const allowedTypes = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp'];
    const regexp = /[a-zA-Z0-9.a-zA-Z]/g.test(image);
    return regexp && allowedTypes.includes(imageType);
  }

}

exports.ImageName = ImageName;