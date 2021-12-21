"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftDeleteArticleController = void 0;

var _SoftDeleteArticleUseCase = require("../../../useCases/SoftDeleteArticleUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class SoftDeleteArticleController {
  async handle(req, res) {
    const {
      articleId
    } = req.params;
    const {
      userId
    } = req.userData;

    const deleteArticle = _tsyringe.container.resolve(_SoftDeleteArticleUseCase.SoftDeleteArticleUseCase);

    await deleteArticle.execute({
      userId,
      articleId
    });
    return (0, _httpResponses.ok)(res, {
      message: 'Your article will be deleted in 1 month'
    });
  }

}

exports.SoftDeleteArticleController = SoftDeleteArticleController;