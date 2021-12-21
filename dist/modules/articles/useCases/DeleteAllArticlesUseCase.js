"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAllArticlesUseCase = void 0;

var _tsyringe = require("tsyringe");

var _DateProviderProtocol = require("../../../shared/providers/dateProvider/DateProviderProtocol");

var _ArticleRepositoryProtocol = require("../repositories/ArticleRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let DeleteAllArticlesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ArticleRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ArticleRepositoryProtocol.ArticleRepositoryProtocol === "undefined" ? Object : _ArticleRepositoryProtocol.ArticleRepositoryProtocol, typeof _DateProviderProtocol.DateProviderProtocol === "undefined" ? Object : _DateProviderProtocol.DateProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteAllArticlesUseCase {
  constructor(_articleRepository, _dateProvider) {
    this._articleRepository = _articleRepository;
    this._dateProvider = _dateProvider;
  }

  async execute() {
    const articles = await this._articleRepository.findAllDeleted();

    for (const article of articles) {
      if (!article.deletedAt) continue;

      const deletedAtPlusOneMonth = this._dateProvider.add(article.deletedAt, {
        months: 1
      });

      if (deletedAtPlusOneMonth.getTime() < Date.now()) continue;
      await this._articleRepository.delete(article.id.value);
    }
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.DeleteAllArticlesUseCase = DeleteAllArticlesUseCase;