"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateArticleThumbnailController = void 0;

var _UpdateArticleThumbnailUseCase = require("../../../useCases/UpdateArticleThumbnailUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _SharpProvider = require("../../../../../shared/providers/processImageProvider/implementations/SharpProvider");

var _tsyringe = require("tsyringe");

var _path = require("path");

class UpdateArticleThumbnailController {
  async handle(req, res) {
    let thumbnail;

    if (req.file) {
      const sharpProvider = new _SharpProvider.SharpProvider();
      const newPath = await sharpProvider.convertToWebp((0, _path.resolve)(req.file.path));
      thumbnail = (0, _path.basename)(newPath);
    }

    const {
      articleId
    } = req.params;
    const {
      userId
    } = req.userData;

    const updateArticle = _tsyringe.container.resolve(_UpdateArticleThumbnailUseCase.UpdateArticleThumbnailUseCase);

    await updateArticle.execute({
      thumbnail,
      userId,
      articleId
    });
    return (0, _httpResponses.ok)(res, {
      message: 'Your article was updated successfully'
    });
  }

}

exports.UpdateArticleThumbnailController = UpdateArticleThumbnailController;