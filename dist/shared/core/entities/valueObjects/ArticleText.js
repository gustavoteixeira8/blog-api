"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArticleText = void 0;

var _errors = require("../../errors");

var _ValueObjectProtocol = require("./ValueObjectProtocol");

class ArticleText extends _ValueObjectProtocol.ValueObjectProtocol {
  static create(text) {
    if (!this.validate(text)) {
      return new _errors.InvalidArticleTextError();
    }

    return new ArticleText(text);
  }

  static validate(text) {
    if (typeof text !== 'string') return false;
    return text.length >= 100 && text.length <= 30_000;
  }

}

exports.ArticleText = ArticleText;