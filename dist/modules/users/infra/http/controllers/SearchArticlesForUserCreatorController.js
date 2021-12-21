"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchArticlesForUserCreatorController = void 0;

var _ArticleMapper = require("../../../../articles/mappers/ArticleMapper");

var _SearchArticlesForUserCreatorUseCase = require("../../../useCases/SearchArticlesForUserCreatorUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _resolveQueryParams = require("../../../../../shared/infra/http/utils/resolveQueryParams");

var _tsyringe = require("tsyringe");

class SearchArticlesForUserCreatorController {
  async handle(req, res) {
    const {
      categoryName,
      articleTitle,
      isPublic,
      isDeleted,
      order,
      page,
      perPage
    } = req.query;
    const {
      userId
    } = req.userData;
    const orderFormatted = (0, _resolveQueryParams.resolveOrderByParams)(order);
    const numbersFormatted = (0, _resolveQueryParams.resolveSearchParamsNumbers)({
      perPage,
      page
    });
    const stringsFormatted = (0, _resolveQueryParams.resolveSearchParamsStrings)({
      categoryName,
      articleTitle
    });
    const boolFormatted = (0, _resolveQueryParams.resolveSearchParamsBoolean)({
      isPublic,
      isDeleted
    });

    const searchForCreator = _tsyringe.container.resolve(_SearchArticlesForUserCreatorUseCase.SearchArticlesForUserCreatorUseCase);

    const result = await searchForCreator.execute({
      userId,
      categoryName: stringsFormatted.categoryName,
      articleTitle: stringsFormatted.articleTitle,
      isDeleted: boolFormatted.isDeleted,
      isPublic: boolFormatted.isPublic,
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

exports.SearchArticlesForUserCreatorController = SearchArticlesForUserCreatorController;