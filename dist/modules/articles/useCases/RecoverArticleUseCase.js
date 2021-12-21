"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecoverArticleUseCase = void 0;

var _UserRepositoryProtocol = require("../../users/repositories/UserRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _tsyringe = require("tsyringe");

var _ArticleRepositoryProtocol = require("../repositories/ArticleRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let RecoverArticleUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ArticleRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ArticleRepositoryProtocol.ArticleRepositoryProtocol === "undefined" ? Object : _ArticleRepositoryProtocol.ArticleRepositoryProtocol, typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RecoverArticleUseCase {
  constructor(_articleRepository, _userRepository) {
    this._articleRepository = _articleRepository;
    this._userRepository = _userRepository;
  }

  async execute({
    articleId,
    userId
  }) {
    if (!articleId || !userId) throw new _errors.MissingParamError('Article id and user id');
    const [user, article] = await Promise.all([this._userRepository.findById(userId, {
      withDeleted: false
    }), this._articleRepository.findById(articleId, {
      withDeleted: true
    })]);
    if (!user) throw new _errors.UserNotFoundError('User not found');

    if (!user.isEmailVerified) {
      throw new _errors.UserEmailIsNotVerifiedError();
    }

    if (!user.isAdmin) {
      throw new _errors.UserIsNotAdminError();
    }

    if (!article || !article.deletedAt) {
      throw new _errors.ArticleNotFoundError();
    }

    if (article.userId.value !== user.id.value) {
      throw new _errors.ArticleIsNotYoursError();
    }

    article.recover();
    await this._articleRepository.save(article);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.RecoverArticleUseCase = RecoverArticleUseCase;