"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftDeleteArticleUseCase = void 0;

var _app = require("../../../config/app");

var _UserRepositoryProtocol = require("../../users/repositories/UserRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _QueueProviderProtocol = require("../../../shared/providers/queueProvider/QueueProviderProtocol");

var _tsyringe = require("tsyringe");

var _ArticleRepositoryProtocol = require("../repositories/ArticleRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let SoftDeleteArticleUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ArticleRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('MailQueueProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _ArticleRepositoryProtocol.ArticleRepositoryProtocol === "undefined" ? Object : _ArticleRepositoryProtocol.ArticleRepositoryProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class SoftDeleteArticleUseCase {
  constructor(_userRepository, _articleRepository, _mailQueueProvider) {
    this._userRepository = _userRepository;
    this._articleRepository = _articleRepository;
    this._mailQueueProvider = _mailQueueProvider;
  }

  async execute({
    articleId,
    userId
  }) {
    if (!articleId || !userId) throw new _errors.MissingParamError('Article id and user id');
    const user = await this._userRepository.findById(userId, {
      withDeleted: false
    });
    if (!user) throw new _errors.UserNotFoundError();

    if (!user.isEmailVerified) {
      throw new _errors.UserEmailIsNotVerifiedError();
    }

    if (!user.isAdmin) {
      throw new _errors.UserIsNotAdminError();
    }

    const article = await this._articleRepository.findById(articleId, {
      withDeleted: false
    });
    if (!article) throw new _errors.ArticleNotFoundError();

    if (article.userId.value !== user.id.value) {
      throw new _errors.ArticleIsNotYoursError();
    }

    article.delete();
    article.makePrivate();
    await Promise.all([this._articleRepository.save(article), this._mailQueueProvider.add({
      to: {
        name: user.fullName.value,
        address: user.email.value
      },
      subject: `An article was deleted by you - ${_app.appConfig.name}`,
      context: {
        user: {
          username: user.username.value
        },
        article: {
          id: article.id.value,
          title: article.title.value,
          slug: article.slug.value,
          isPublic: article.isPublic,
          createdAt: article.createdAt
        },
        appConfig: _app.appConfig
      },
      html: {
        filename: 'articleSoftDeleted',
        module: 'articles'
      }
    })]);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.SoftDeleteArticleUseCase = SoftDeleteArticleUseCase;