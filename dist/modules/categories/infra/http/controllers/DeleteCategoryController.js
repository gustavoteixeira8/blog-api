"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCategoryController = void 0;

var _DeleteCategoryUseCase = require("../../../useCases/DeleteCategoryUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class DeleteCategoryController {
  async handle(req, res) {
    const {
      categoryId
    } = req.params;
    const {
      userId
    } = req.userData;

    const deleteCategory = _tsyringe.container.resolve(_DeleteCategoryUseCase.DeleteCategoryUseCase);

    await deleteCategory.execute({
      categoryId,
      userId
    });
    return (0, _httpResponses.ok)(res, {
      message: 'Category was successfully deleted'
    });
  }

}

exports.DeleteCategoryController = DeleteCategoryController;