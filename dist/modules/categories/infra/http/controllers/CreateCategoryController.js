"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryController = void 0;

var _CreateCategoryUseCase = require("../../../useCases/CreateCategoryUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class CreateCategoryController {
  async handle(req, res) {
    const {
      name
    } = req.body;
    const {
      userId
    } = req.userData;

    const createCategory = _tsyringe.container.resolve(_CreateCategoryUseCase.CreateCategoryUseCase);

    await createCategory.execute({
      name,
      userId
    });
    return (0, _httpResponses.created)(res, {
      message: 'Category was successfully created'
    });
  }

}

exports.CreateCategoryController = CreateCategoryController;