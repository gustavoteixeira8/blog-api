"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowCategoryByIdController = void 0;

var _CategoryMapper = require("../../../mappers/CategoryMapper");

var _ShowCategoryByIdUseCase = require("../../../useCases/ShowCategoryByIdUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class ShowCategoryByIdController {
  async handle(req, res) {
    const {
      categoryId
    } = req.params;

    const showCategory = _tsyringe.container.resolve(_ShowCategoryByIdUseCase.ShowCategoryByIdUseCase);

    const category = await showCategory.execute({
      categoryId
    });

    const categoryFormatted = _CategoryMapper.CategoryMapper.toDetails(category);

    return (0, _httpResponses.ok)(res, {
      category: categoryFormatted
    });
  }

}

exports.ShowCategoryByIdController = ShowCategoryByIdController;