"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowCategoryBySlugController = void 0;

var _CategoryMapper = require("../../../mappers/CategoryMapper");

var _ShowCategoryBySlugUseCase = require("../../../useCases/ShowCategoryBySlugUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class ShowCategoryBySlugController {
  async handle(req, res) {
    const {
      categorySlug
    } = req.params;

    const showCategory = _tsyringe.container.resolve(_ShowCategoryBySlugUseCase.ShowCategoryBySlugUseCase);

    const category = await showCategory.execute({
      categorySlug
    });

    const categoryFormatted = _CategoryMapper.CategoryMapper.toDetails(category);

    return (0, _httpResponses.ok)(res, {
      category: categoryFormatted
    });
  }

}

exports.ShowCategoryBySlugController = ShowCategoryBySlugController;