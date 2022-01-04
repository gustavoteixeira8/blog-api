"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCategoryController = exports.showCategoryBySlugController = exports.showAllCategoriesController = exports.deleteCategoryController = exports.createCategoryController = void 0;

var _CreateCategoryController = require("./CreateCategoryController");

var _DeleteCategoryController = require("./DeleteCategoryController");

var _ShowAllCategoriesController = require("./ShowAllCategoriesController");

var _ShowCategoryBySlugController = require("./ShowCategoryBySlugController");

var _UpdateCategoryController = require("./UpdateCategoryController");

const createCategoryController = new _CreateCategoryController.CreateCategoryController();
exports.createCategoryController = createCategoryController;
const updateCategoryController = new _UpdateCategoryController.UpdateCategoryController();
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = new _DeleteCategoryController.DeleteCategoryController();
exports.deleteCategoryController = deleteCategoryController;
const showAllCategoriesController = new _ShowAllCategoriesController.ShowAllCategoriesController();
exports.showAllCategoriesController = showAllCategoriesController;
const showCategoryBySlugController = new _ShowCategoryBySlugController.ShowCategoryBySlugController();
exports.showCategoryBySlugController = showCategoryBySlugController;