"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCategoryController = void 0;

var _UpdateCategoryUseCase = require("../../../useCases/UpdateCategoryUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class UpdateCategoryController {
  async handle(req, res) {
    const {
      name
    } = req.body;
    const {
      categoryId
    } = req.params;
    const {
      userId
    } = req.userData;

    const updateCategory = _tsyringe.container.resolve(_UpdateCategoryUseCase.UpdateCategoryUseCase);

    await updateCategory.execute({
      name,
      categoryId,
      userId
    });
    return (0, _httpResponses.ok)(res, {
      message: 'Category was updated successfully'
    });
  }

}

exports.UpdateCategoryController = UpdateCategoryController;