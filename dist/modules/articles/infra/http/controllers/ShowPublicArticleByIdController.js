"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowPublicArticleByIdController = void 0;

var _ArticleMapper = require("../../../mappers/ArticleMapper");

var _ShowPublicArticleByIdUseCase = require("../../../useCases/ShowPublicArticleByIdUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class ShowPublicArticleByIdController {
  async handle(req, res) {
    const {
      articleId
    } = req.params;

    const showArticle = _tsyringe.container.resolve(_ShowPublicArticleByIdUseCase.ShowPublicArticleByIdUseCase);

    const article = await showArticle.execute({
      articleId
    });

    const articleFormatted = _ArticleMapper.ArticleMapper.toDetails(article, true);

    return (0, _httpResponses.ok)(res, {
      article: articleFormatted
    });
  }

}

exports.ShowPublicArticleByIdController = ShowPublicArticleByIdController;