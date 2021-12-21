"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchPublicArticlesUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ArticleRepositoryProtocol = require("../repositories/ArticleRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _class;

let SearchPublicArticlesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ArticleRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ArticleRepositoryProtocol.ArticleRepositoryProtocol === "undefined" ? Object : _ArticleRepositoryProtocol.ArticleRepositoryProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class SearchPublicArticlesUseCase {
  constructor(_articleRepository) {
    this._articleRepository = _articleRepository;
  }

  async execute({
    order,
    page,
    perPage,
    articleTitle,
    categoryName,
    username
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
    return await this._articleRepository.searchWithRelations({
      articleTitle,
      categoryName,
      username
    }, pagination);
  }

}) || _class) || _class) || _class) || _class);
exports.SearchPublicArticlesUseCase = SearchPublicArticlesUseCase;