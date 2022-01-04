"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateArticleThumbnailController = exports.updateArticleController = exports.softDeleteArticleController = exports.showPublicArticleBySlugController = exports.searchPublicArticlesController = exports.recoverArticleController = exports.createArticleController = void 0;

var _CreateArticleController = require("./CreateArticleController");

var _ShowPublicArticleBySlugController = require("./ShowPublicArticleBySlugController");

var _SoftDeleteArticleController = require("./SoftDeleteArticleController");

var _UpdateArticleController = require("./UpdateArticleController");

var _UpdateArticleThumbnailController = require("./UpdateArticleThumbnailController");

var _RecoverArticleController = require("./RecoverArticleController");

var _SearchPublicArticlesController = require("./SearchPublicArticlesController");

const createArticleController = new _CreateArticleController.CreateArticleController();
exports.createArticleController = createArticleController;
const showPublicArticleBySlugController = new _ShowPublicArticleBySlugController.ShowPublicArticleBySlugController();
exports.showPublicArticleBySlugController = showPublicArticleBySlugController;
const updateArticleController = new _UpdateArticleController.UpdateArticleController();
exports.updateArticleController = updateArticleController;
const updateArticleThumbnailController = new _UpdateArticleThumbnailController.UpdateArticleThumbnailController();
exports.updateArticleThumbnailController = updateArticleThumbnailController;
const softDeleteArticleController = new _SoftDeleteArticleController.SoftDeleteArticleController();
exports.softDeleteArticleController = softDeleteArticleController;
const recoverArticleController = new _RecoverArticleController.RecoverArticleController();
exports.recoverArticleController = recoverArticleController;
const searchPublicArticlesController = new _SearchPublicArticlesController.SearchPublicArticlesController();
exports.searchPublicArticlesController = searchPublicArticlesController;