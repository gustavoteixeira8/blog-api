"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateArticleController = void 0;

var _CreateArticleUseCase = require("../../../useCases/CreateArticleUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class CreateArticleController {
  async handle(req, res) {
    const {
      title,
      text,
      isPublic,
      categoriesId
    } = req.body;
    const {
      userId
    } = req.userData;

    const createArticle = _tsyringe.container.resolve(_CreateArticleUseCase.CreateArticleUseCase);

    await createArticle.execute({
      title,
      text,
      isPublic,
      categoriesId,
      userId
    });
    return (0, _httpResponses.created)(res, {
      message: 'Your article was created successfully'
    });
  }

}

exports.CreateArticleController = CreateArticleController;