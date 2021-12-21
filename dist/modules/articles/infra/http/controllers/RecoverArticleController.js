"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecoverArticleController = void 0;

var _RecoverArticleUseCase = require("../../../useCases/RecoverArticleUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class RecoverArticleController {
  async handle(req, res) {
    const {
      articleId
    } = req.params;
    const {
      userId
    } = req.userData;

    const recoverArticle = _tsyringe.container.resolve(_RecoverArticleUseCase.RecoverArticleUseCase);

    await recoverArticle.execute({
      articleId,
      userId
    });
    return (0, _httpResponses.ok)(res, {
      message: 'Your article was recovered successfully'
    });
  }

}

exports.RecoverArticleController = RecoverArticleController;