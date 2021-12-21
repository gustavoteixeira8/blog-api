"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateArticleUseCase = void 0;

var _tsyringe = require("tsyringe");

var _SlugProviderProtocol = require("../../../shared/providers/slugProvider/SlugProviderProtocol");

var _CategoryRepositoryProtocol = require("../../categories/repositories/CategoryRepositoryProtocol");

var _Article = require("../entities/Article");

var _QueueProviderProtocol = require("../../../shared/providers/queueProvider/QueueProviderProtocol");

var _app = require("../../../config/app");

var _UserRepositoryProtocol = require("../../users/repositories/UserRepositoryProtocol");

var _ArticleRepositoryProtocol = require("../repositories/ArticleRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

let CreateArticleUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ArticleRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CategoryRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('SlugProvider')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('MailQueueProvider')(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _ArticleRepositoryProtocol.ArticleRepositoryProtocol === "undefined" ? Object : _ArticleRepositoryProtocol.ArticleRepositoryProtocol, typeof _CategoryRepositoryProtocol.CategoryRepositoryProtocol === "undefined" ? Object : _CategoryRepositoryProtocol.CategoryRepositoryProtocol, typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _SlugProviderProtocol.SlugProviderProtocol === "undefined" ? Object : _SlugProviderProtocol.SlugProviderProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class CreateArticleUseCase {
  constructor(_articleRepository, _categoryRepository, _userRepository, _slugProvider, _mailQueueProvider) {
    this._articleRepository = _articleRepository;
    this._categoryRepository = _categoryRepository;
    this._userRepository = _userRepository;
    this._slugProvider = _slugProvider;
    this._mailQueueProvider = _mailQueueProvider;
  }

  async execute({
    title,
    text,
    isPublic,
    userId,
    categoriesId
  }) {
    if (!userId) {
      throw new _errors.MissingParamError('User id');
    }

    if (!title || !text || !categoriesId || !categoriesId.length) {
      throw new _errors.MissingParamError('Title, text and categories id');
    }

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

    const slug = this._slugProvider.generate(title);

    const articleExists = await this._articleRepository.existsWithSlug(slug, {
      withDeleted: true
    });

    if (articleExists) {
      throw new _errors.ArticleTitleAlreadyExistsError();
    }

    for (const categoryId of categoriesId) {
      if (!(await this._categoryRepository.findById(categoryId))) {
        throw new _errors.CategoryNotFoundError();
      }
    }

    const article = _Article.Article.create({
      title,
      text,
      slug,
      userId,
      categoriesId,
      isPublic,
      thumbnail: null
    });

    await Promise.all([this._articleRepository.save(article), this._mailQueueProvider.add({
      to: {
        name: user.fullName.value,
        address: user.email.value
      },
      subject: `A new article was created by you - ${_app.appConfig.name}`,
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
        filename: 'articleCreated',
        module: 'articles'
      }
    })]);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateArticleUseCase = CreateArticleUseCase;