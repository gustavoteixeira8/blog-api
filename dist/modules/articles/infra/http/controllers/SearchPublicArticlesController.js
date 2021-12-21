"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchPublicArticlesController = void 0;

var _ArticleMapper = require("../../../mappers/ArticleMapper");

var _SearchPublicArticlesUseCase = require("../../../useCases/SearchPublicArticlesUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _resolveQueryParams = require("../../../../../shared/infra/http/utils/resolveQueryParams");

var _tsyringe = require("tsyringe");

class SearchPublicArticlesController {
  async handle(req, res) {
    const {
      categoryName,
      articleTitle,
      order,
      page,
      perPage,
      username
    } = req.query;
    const orderFormatted = (0, _resolveQueryParams.resolveOrderByParams)(order);
    const numbersFormatted = (0, _resolveQueryParams.resolveSearchParamsNumbers)({
      perPage,
      page
    });
    const stringsFormatted = (0, _resolveQueryParams.resolveSearchParamsStrings)({
      categoryName,
      articleTitle,
      username
    });

    const searchForCreator = _tsyringe.container.resolve(_SearchPublicArticlesUseCase.SearchPublicArticlesUseCase);

    const result = await searchForCreator.execute({
      categoryName: stringsFormatted.categoryName,
      username: stringsFormatted.username,
      articleTitle: stringsFormatted.articleTitle,
      order: orderFormatted,
      page: numbersFormatted.page,
      perPage: numbersFormatted.perPage
    });
    const articlesFormatted = result.data.map(article => _ArticleMapper.ArticleMapper.toDetails(article, false));
    return (0, _httpResponses.ok)(res, {
      articles: { ...result,
        data: articlesFormatted
      }
    });
  }

}

exports.SearchPublicArticlesController = SearchPublicArticlesController;