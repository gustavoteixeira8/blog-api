"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _CategoryRepositoryProtocol = require("../repositories/CategoryRepositoryProtocol");

var _UserRepositoryProtocol = require("../../users/repositories/UserRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let DeleteCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoryRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _CategoryRepositoryProtocol.CategoryRepositoryProtocol === "undefined" ? Object : _CategoryRepositoryProtocol.CategoryRepositoryProtocol, typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteCategoryUseCase {
  constructor(_categoryRepository, _userRepository) {
    this._categoryRepository = _categoryRepository;
    this._userRepository = _userRepository;
  }

  async execute({
    categoryId,
    userId
  }) {
    if (!userId || !categoryId) throw new _errors.MissingParamError('User id and category id');
    const userExists = await this._userRepository.findById(userId, {
      withDeleted: false
    });
    if (!userExists) throw new _errors.UserNotFoundError();

    if (!userExists.isEmailVerified) {
      throw new _errors.UserEmailIsNotVerifiedError();
    }

    if (!userExists.isAdmin) {
      throw new _errors.UserIsNotAdminError();
    }

    const categoryExists = await this._categoryRepository.findById(categoryId);
    if (!categoryExists) throw new _errors.CategoryNotFoundError();
    const categoryIsRelatedWithArticle = await this._categoryRepository.existsInArticle(categoryId);

    if (categoryIsRelatedWithArticle) {
      throw new _errors.CategoryIsRelatedWithArticleError();
    }

    await this._categoryRepository.delete(categoryId);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.DeleteCategoryUseCase = DeleteCategoryUseCase;