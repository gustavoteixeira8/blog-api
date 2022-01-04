"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.articleRoutes = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _ensureAuthentication = require("../../../../../shared/infra/http/middlewares/ensureAuthentication");

var _ensureUserIsAdmin = require("../../../../../shared/infra/http/middlewares/ensureUserIsAdmin");

var _express = require("express");

var _controllers = require("../controllers");

var _upload = require("../../../../../config/upload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const articleRoutes = (0, _express.Router)();
exports.articleRoutes = articleRoutes;
articleRoutes.get('/', _controllers.searchPublicArticlesController.handle);
articleRoutes.get('/:articleSlug', _controllers.showPublicArticleBySlugController.handle);
articleRoutes.use(_ensureAuthentication.ensureAuthentication);
articleRoutes.use(_ensureUserIsAdmin.ensureUserIsAdmin);
articleRoutes.post('/', _controllers.createArticleController.handle);
articleRoutes.put('/:articleId', _controllers.updateArticleController.handle);
articleRoutes.put('/:articleId/recover', _controllers.recoverArticleController.handle);
articleRoutes.delete('/:articleId', _controllers.softDeleteArticleController.handle);
const multerThumbnail = (0, _multer.default)(_upload.uploadConfig.multer).single('articleThumbnail');
articleRoutes.put('/:articleId/thumbnail', multerThumbnail, _controllers.updateArticleThumbnailController.handle);