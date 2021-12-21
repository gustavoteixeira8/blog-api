"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowPublicArticleByIdUseCase = void 0;

var _errors = require("../../../shared/core/errors");

var _tsyringe = require("tsyringe");

var _ArticleRepositoryProtocol = require("../repositories/ArticleRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _class;

let ShowPublicArticleByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ArticleRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ArticleRepositoryProtocol.ArticleRepositoryProtocol === "undefined" ? Object : _ArticleRepositoryProtocol.ArticleRepositoryProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowPublicArticleByIdUseCase {
  constructor(_articleRepository) {
    this._articleRepository = _articleRepository;
  }

  async execute({
    articleId
  }) {
    if (!articleId) throw new _errors.MissingParamError('Article id');
    const article = await this._articleRepository.findPublicByIdWithRelations(articleId, {
      withDeleted: false
    });
    if (!article) throw new _errors.ArticleNotFoundError();
    return article;
  }

}) || _class) || _class) || _class) || _class);
exports.ShowPublicArticleByIdUseCase = ShowPublicArticleByIdUseCase;