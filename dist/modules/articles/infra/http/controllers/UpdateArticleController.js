"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateArticleController = void 0;

var _UpdateArticleUseCase = require("../../../useCases/UpdateArticleUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class UpdateArticleController {
  async handle(req, res) {
    const {
      title,
      text,
      isPublic,
      categoriesId
    } = req.body;
    const {
      articleId
    } = req.params;
    const {
      userId
    } = req.userData;

    const updateArticle = _tsyringe.container.resolve(_UpdateArticleUseCase.UpdateArticleUseCase);

    await updateArticle.execute({
      title,
      text,
      isPublic,
      categoriesId,
      userId,
      articleId
    });
    return (0, _httpResponses.ok)(res, {
      message: 'Your article was updated successfully'
    });
  }

}

exports.UpdateArticleController = UpdateArticleController;