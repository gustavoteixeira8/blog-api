"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArticleMapper = void 0;

var _Article = require("../entities/Article");

var _UserMapper = require("../../users/mappers/UserMapper");

var _CategoryMapper = require("../../categories/mappers/CategoryMapper");

class ArticleMapper {
  static toPersistence(article) {
    return {
      id: article.id.value,
      title: article.title.value,
      text: article.text.value,
      slug: article.slug.value,
      isPublic: article.isPublic,
      thumbnail: !article.thumbnail ? null : article.thumbnail.value,
      userId: article.userId.value,
      categoriesId: article.categoriesId.map(id => id.value),
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      deletedAt: article.deletedAt
    };
  }

  static toDomain(article) {
    return _Article.Article.create({
      id: article.id,
      title: article.title,
      text: article.text,
      isPublic: article.isPublic,
      slug: article.slug,
      thumbnail: article.thumbnail,
      userId: article.userId,
      categoriesId: article.categoriesId,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      deletedAt: article.deletedAt
    });
  }

  static toDetails({
    article,
    user,
    categories
  }, withText = false) {
    return {
      id: article.id.value,
      title: article.title.value,
      ...(withText ? {
        text: article.text.value
      } : null),
      slug: article.slug.value,
      isPublic: article.isPublic,
      thumbnail: !article.thumbnail ? null : article.thumbnail.value,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      deletedAt: article.deletedAt,
      user: _UserMapper.UserMapper.toDetails(user),
      categories: categories.map(_CategoryMapper.CategoryMapper.toDetails)
    };
  }

}

exports.ArticleMapper = ArticleMapper;