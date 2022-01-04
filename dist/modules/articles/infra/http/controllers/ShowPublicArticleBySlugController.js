"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowPublicArticleBySlugController = void 0;

var _ArticleMapper = require("../../../mappers/ArticleMapper");

var _ShowPublicArticleBySlugUseCase = require("../../../useCases/ShowPublicArticleBySlugUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class ShowPublicArticleBySlugController {
  async handle(req, res) {
    const {
      articleSlug
    } = req.params;

    const showArticle = _tsyringe.container.resolve(_ShowPublicArticleBySlugUseCase.ShowPublicArticleBySlugUseCase);

    const article = await showArticle.execute({
      articleSlug
    });

    const articleFormatted = _ArticleMapper.ArticleMapper.toDetails(article, true);

    return (0, _httpResponses.ok)(res, {
      article: articleFormatted
    });
  }

}

exports.ShowPublicArticleBySlugController = ShowPublicArticleBySlugController;