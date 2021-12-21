"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowAllCategoriesController = void 0;

var _CategoryMapper = require("../../../mappers/CategoryMapper");

var _ShowAllCategoriesUseCase = require("../../../useCases/ShowAllCategoriesUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _resolveQueryParams = require("../../../../../shared/infra/http/utils/resolveQueryParams");

var _tsyringe = require("tsyringe");

class ShowAllCategoriesController {
  async handle(req, res) {
    const {
      order,
      perPage,
      page
    } = req.query;
    const orderFormatted = (0, _resolveQueryParams.resolveOrderByParams)(order);
    const numbersFormatted = (0, _resolveQueryParams.resolveSearchParamsNumbers)({
      perPage,
      page
    });

    const showCategories = _tsyringe.container.resolve(_ShowAllCategoriesUseCase.ShowAllCategoriesUseCase);

    const result = await showCategories.execute({
      perPage: numbersFormatted.perPage,
      page: numbersFormatted.page,
      order: orderFormatted
    });
    const articlesFormatted = result.data.map(_CategoryMapper.CategoryMapper.toDetails);
    return (0, _httpResponses.ok)(res, { ...result,
      data: articlesFormatted
    });
  }

}

exports.ShowAllCategoriesController = ShowAllCategoriesController;