"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowArticleForCreatorController = void 0;

var _ArticleMapper = require("../../../../articles/mappers/ArticleMapper");

var _ShowArticleForCreatorUseCase = require("../../../useCases/ShowArticleForCreatorUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class ShowArticleForCreatorController {
  async handle(req, res) {
    const {
      userId
    } = req.userData;
    const {
      articleSlug
    } = req.params;

    const showArticle = _tsyringe.container.resolve(_ShowArticleForCreatorUseCase.ShowArticleForCreatorUseCase);

    const article = await showArticle.execute({
      articleSlug,
      userId
    });

    const articleFormatted = _ArticleMapper.ArticleMapper.toDetails(article, true);

    return (0, _httpResponses.ok)(res, {
      article: articleFormatted
    });
  }

}

exports.ShowArticleForCreatorController = ShowArticleForCreatorController;