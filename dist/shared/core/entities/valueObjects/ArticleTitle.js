"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArticleTitle = void 0;

var _errors = require("../../errors");

var _ValueObjectProtocol = require("./ValueObjectProtocol");

class ArticleTitle extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(title) {
    const titleFormatted = this.format(title);

    if (!this.validate(titleFormatted)) {
      return new _errors.InvalidArticleTitleError();
    }

    return new ArticleTitle(titleFormatted);
  }

  static format(title) {
    return title[0].toUpperCase() + title.substring(1);
  }

  static validate(title) {
    if (typeof title !== 'string') return false;
    const nameTrim = title.trim();
    const checkLength = nameTrim.length >= 5 && nameTrim.length < 255;
    const alphanumericAndNonAlphanumeric = /^[\w\W]+$/.test(title);
    return checkLength && alphanumericAndNonAlphanumeric;
  }

}

exports.ArticleTitle = ArticleTitle;