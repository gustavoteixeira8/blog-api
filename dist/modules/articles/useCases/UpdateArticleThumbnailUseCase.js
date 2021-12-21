"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateArticleThumbnailUseCase = void 0;

var _tsyringe = require("tsyringe");

var _UserRepositoryProtocol = require("../../users/repositories/UserRepositoryProtocol");

var _ArticleRepositoryProtocol = require("../repositories/ArticleRepositoryProtocol");

var _QueueProviderProtocol = require("../../../shared/providers/queueProvider/QueueProviderProtocol");

var _ImageName = require("../../../shared/core/entities/valueObjects/ImageName");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let UpdateArticleThumbnailUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ArticleRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('StorageQueueProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ArticleRepositoryProtocol.ArticleRepositoryProtocol === "undefined" ? Object : _ArticleRepositoryProtocol.ArticleRepositoryProtocol, typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UpdateArticleThumbnailUseCase {
  constructor(_articleRepository, _userRepository, _storageQueueProvider) {
    this._articleRepository = _articleRepository;
    this._userRepository = _userRepository;
    this._storageQueueProvider = _storageQueueProvider;
  }

  async execute({
    thumbnail,
    articleId,
    userId
  }) {
    if (!articleId || !userId) throw new _errors.MissingParamError('Article id and user id');
    const [user, article] = await Promise.all([this._userRepository.findById(userId), this._articleRepository.findById(articleId)]);
    if (!user) throw new _errors.UserNotFoundError('User not found');

    if (!user.isEmailVerified) {
      throw new _errors.UserEmailIsNotVerifiedError();
    }

    if (!user.isAdmin) {
      throw new _errors.UserIsNotAdminError();
    }

    if (!article) throw new _errors.ArticleNotFoundError();

    if (article.userId.value !== user.id.value) {
      throw new _errors.ArticleIsNotYoursError();
    }

    if (!thumbnail) {
      const oldName = article.thumbnail;

      if (oldName) {
        article.updateThumbnail(null);
        await Promise.all([this._articleRepository.save(article), this._storageQueueProvider.add({
          filename: oldName.value,
          action: 'DELETE',
          filetype: 'image'
        })]);
      }

      return;
    }

    const newThumbnail = _ImageName.ImageName.create(thumbnail);

    const oldThumbnail = article.thumbnail?.value;

    if (newThumbnail instanceof Error) {
      throw new _errors.InvalidImageNameError();
    }

    article.updateThumbnail(newThumbnail);

    if (oldThumbnail) {
      await this._storageQueueProvider.add({
        filename: oldThumbnail,
        action: 'DELETE',
        filetype: 'image'
      });
    }

    await Promise.all([this._articleRepository.save(article), this._storageQueueProvider.add({
      filename: newThumbnail.value,
      action: 'SAVE',
      filetype: 'image'
    })]);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.UpdateArticleThumbnailUseCase = UpdateArticleThumbnailUseCase;