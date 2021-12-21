"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowAllCategoriesUseCase = void 0;

var _tsyringe = require("tsyringe");

var _CategoryRepositoryProtocol = require("../repositories/CategoryRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _class;

let ShowAllCategoriesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoryRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _CategoryRepositoryProtocol.CategoryRepositoryProtocol === "undefined" ? Object : _CategoryRepositoryProtocol.CategoryRepositoryProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowAllCategoriesUseCase {
  constructor(_categoryRepository) {
    this._categoryRepository = _categoryRepository;
  }

  async execute({
    order,
    page,
    perPage
  }) {
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
    const categories = await this._categoryRepository.findAllPaginate(pagination);
    return categories;
  }

}) || _class) || _class) || _class) || _class);
exports.ShowAllCategoriesUseCase = ShowAllCategoriesUseCase;