"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryMapper = void 0;

var _Category = require("../entities/Category");

class CategoryMapper {
  static toPersistence(category) {
    return {
      id: category.id?.value || '',
      name: category.name.value,
      slug: category.slug.value,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    };
  }

  static toDomain(category) {
    return _Category.Category.create(category);
  }

  static toDetails(category) {
    return {
      id: category.id.value,
      name: category.name.value,
      slug: category.slug.value
    };
  }

}

exports.CategoryMapper = CategoryMapper;