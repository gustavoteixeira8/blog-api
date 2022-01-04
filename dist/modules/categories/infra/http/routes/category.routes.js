"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryRoutes = void 0;

var _ensureAuthentication = require("../../../../../shared/infra/http/middlewares/ensureAuthentication");

var _ensureUserIsAdmin = require("../../../../../shared/infra/http/middlewares/ensureUserIsAdmin");

var _express = require("express");

var _controllers = require("../controllers");

const categoryRoutes = (0, _express.Router)();
exports.categoryRoutes = categoryRoutes;
categoryRoutes.get('/', _controllers.showAllCategoriesController.handle);
categoryRoutes.get('/:categorySlug', _controllers.showCategoryBySlugController.handle);
categoryRoutes.use(_ensureAuthentication.ensureAuthentication);
categoryRoutes.use(_ensureUserIsAdmin.ensureUserIsAdmin);
categoryRoutes.post('/', _controllers.createCategoryController.handle);
categoryRoutes.put('/:categoryId', _controllers.updateCategoryController.handle);
categoryRoutes.delete('/:categoryId', _controllers.deleteCategoryController.handle);