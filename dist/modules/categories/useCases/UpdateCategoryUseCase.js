"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _CategoryRepositoryProtocol = require("../repositories/CategoryRepositoryProtocol");

var _CategoryName = require("../../../shared/core/entities/valueObjects/CategoryName");

var _Slug = require("../../../shared/core/entities/valueObjects/Slug");

var _SlugProviderProtocol = require("../../../shared/providers/slugProvider/SlugProviderProtocol");

var _UserRepositoryProtocol = require("../../users/repositories/UserRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let UpdateCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoryRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('SlugProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _CategoryRepositoryProtocol.CategoryRepositoryProtocol === "undefined" ? Object : _CategoryRepositoryProtocol.CategoryRepositoryProtocol, typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _SlugProviderProtocol.SlugProviderProtocol === "undefined" ? Object : _SlugProviderProtocol.SlugProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UpdateCategoryUseCase {
  constructor(_categoryRepository, _userRepository, _slugProvider) {
    this._categoryRepository = _categoryRepository;
    this._userRepository = _userRepository;
    this._slugProvider = _slugProvider;
  }

  async execute({
    categoryId,
    name,
    userId
  }) {
    if (!userId || !categoryId) throw new _errors.MissingParamError('User id and category id');

    if (!name) {
      throw new _errors.MissingParamError('Category name');
    }

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

    const category = await this._categoryRepository.findById(categoryId);
    if (!category) throw new _errors.CategoryNotFoundError();

    const slug = this._slugProvider.generate(name);

    const categoryAlreadyExists = await this._categoryRepository.existsWithSlug(slug);

    if (categoryAlreadyExists && category.slug.value !== slug) {
      throw new _errors.CategoryNameAlreadyExistsError();
    }

    const categoryNameOrError = _CategoryName.CategoryName.create(name);

    const slugOrError = _Slug.Slug.create(slug);

    if (categoryNameOrError instanceof Error) {
      throw new _errors.InvalidCategoryNameError();
    }

    if (slugOrError instanceof Error) {
      throw new _errors.InvalidSlugError();
    }

    category.updateName(categoryNameOrError, slugOrError);
    await this._categoryRepository.save(category);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.UpdateCategoryUseCase = UpdateCategoryUseCase;