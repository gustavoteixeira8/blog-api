"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchArticlesForUserCreatorUseCase = void 0;

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _tsyringe = require("tsyringe");

var _ArticleRepositoryProtocol = require("../../articles/repositories/ArticleRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let SearchArticlesForUserCreatorUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ArticleRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _ArticleRepositoryProtocol.ArticleRepositoryProtocol === "undefined" ? Object : _ArticleRepositoryProtocol.ArticleRepositoryProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class SearchArticlesForUserCreatorUseCase {
  constructor(_userRepository, _articleRepository) {
    this._userRepository = _userRepository;
    this._articleRepository = _articleRepository;
  }

  async execute({
    order,
    page,
    perPage,
    categoryName,
    articleTitle,
    isDeleted,
    isPublic,
    userId
  }) {
    if (!userId) throw new _errors.MissingParamError('User id');
    const user = await this._userRepository.findById(userId);
    if (!user || !user.isAdmin) throw new _errors.UserIsNotAdminError();
    const take = !perPage || perPage > 20 ? 20 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : {
      createdAt: 'DESC'
    };
    const pagination = {
      order: orderByDefault,
      page: skip,
      perPage: take
    };
    const searchOptions = {
      articleTitle,
      categoryName,
      isPublic,
      isDeleted,
      userId
    };
    return await this._articleRepository.searchForCreatorWithRelations(searchOptions, pagination);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.SearchArticlesForUserCreatorUseCase = SearchArticlesForUserCreatorUseCase;