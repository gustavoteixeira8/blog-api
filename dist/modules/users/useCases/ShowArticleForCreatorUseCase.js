"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowArticleForCreatorUseCase = void 0;

var _errors = require("../../../shared/core/errors");

var _tsyringe = require("tsyringe");

var _ArticleRepositoryProtocol = require("../../articles/repositories/ArticleRepositoryProtocol");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let ShowArticleForCreatorUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ArticleRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ArticleRepositoryProtocol.ArticleRepositoryProtocol === "undefined" ? Object : _ArticleRepositoryProtocol.ArticleRepositoryProtocol, typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ShowArticleForCreatorUseCase {
  constructor(_articleRepository, _userRepository) {
    this._articleRepository = _articleRepository;
    this._userRepository = _userRepository;
  }

  async execute({
    articleSlug,
    userId
  }) {
    if (!articleSlug || !userId) throw new _errors.MissingParamError('Article slug and user id');
    const user = await this._userRepository.findById(userId, {
      withDeleted: false
    });
    if (!user) throw new _errors.UserNotFoundError();
    if (!user.isAdmin) throw new _errors.UserIsNotAdminError();
    const article = await this._articleRepository.findBySlugForCreatorWithRelations(articleSlug, userId);
    if (!article) throw new _errors.ArticleNotFoundError();
    return article;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ShowArticleForCreatorUseCase = ShowArticleForCreatorUseCase;