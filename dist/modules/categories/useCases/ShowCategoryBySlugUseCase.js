"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowCategoryBySlugUseCase = void 0;

var _tsyringe = require("tsyringe");

var _CategoryRepositoryProtocol = require("../repositories/CategoryRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _class;

let ShowCategoryBySlugUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoryRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _CategoryRepositoryProtocol.CategoryRepositoryProtocol === "undefined" ? Object : _CategoryRepositoryProtocol.CategoryRepositoryProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowCategoryBySlugUseCase {
  constructor(_categoryRepository) {
    this._categoryRepository = _categoryRepository;
  }

  async execute({
    categorySlug
  }) {
    if (!categorySlug) throw new _errors.MissingParamError('Category slug');
    const category = await this._categoryRepository.findBySlug(categorySlug);
    if (!category) throw new _errors.CategoryNotFoundError();
    return category;
  }

}) || _class) || _class) || _class) || _class);
exports.ShowCategoryBySlugUseCase = ShowCategoryBySlugUseCase;