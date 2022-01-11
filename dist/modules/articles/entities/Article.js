"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Article = void 0;

var _Entity = require("../../../shared/core/entities/Entity");

var _ArticleText = require("../../../shared/core/entities/valueObjects/ArticleText");

var _ArticleTitle = require("../../../shared/core/entities/valueObjects/ArticleTitle");

var _ForeignKeyId = require("../../../shared/core/entities/valueObjects/ForeignKeyId");

var _Identifier = require("../../../shared/core/entities/valueObjects/Identifier");

var _ImageName = require("../../../shared/core/entities/valueObjects/ImageName");

var _Slug = require("../../../shared/core/entities/valueObjects/Slug");

var _errors = require("../../../shared/core/errors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Article extends _Entity.Entity {
  get title() {
    return this._title;
  }

  get text() {
    return this._text;
  }

  get categoriesId() {
    return this._categoriesId;
  }

  get slug() {
    return this._slug;
  }

  get isPublic() {
    return this._isPublic;
  }

  get thumbnail() {
    return this._thumbnail;
  }

  get userId() {
    return this._userId;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get deletedAt() {
    return this._deletedAt;
  }

  constructor(props) {
    super(props);

    _defineProperty(this, "_title", void 0);

    _defineProperty(this, "_text", void 0);

    _defineProperty(this, "_slug", void 0);

    _defineProperty(this, "_isPublic", void 0);

    _defineProperty(this, "_thumbnail", void 0);

    _defineProperty(this, "_categoriesId", void 0);

    _defineProperty(this, "_userId", void 0);

    _defineProperty(this, "_createdAt", void 0);

    _defineProperty(this, "_updatedAt", void 0);

    _defineProperty(this, "_deletedAt", void 0);

    this._title = props.title;
    this._text = props.text;
    this._categoriesId = props.categoriesId;
    this._slug = props.slug;
    this._thumbnail = props.thumbnail;
    this._userId = props.userId;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._deletedAt = props.deletedAt;
    this._isPublic = props.isPublic;
  }

  static create(article) {
    const articleOrError = {
      id: _Identifier.Identifier.create(article.id),
      title: _ArticleTitle.ArticleTitle.create(article.title),
      text: _ArticleText.ArticleText.create(article.text),
      slug: _Slug.Slug.create(article.slug),
      isPublic: article.isPublic,
      thumbnail: article.thumbnail === null ? null : _ImageName.ImageName.create(article.thumbnail),
      userId: _ForeignKeyId.ForeignKeyId.create(article.userId),
      categoriesId: article.categoriesId.map(id => _ForeignKeyId.ForeignKeyId.create(id)),
      createdAt: !article.createdAt ? new Date() : article.createdAt,
      updatedAt: !article.updatedAt ? new Date() : article.updatedAt,
      deletedAt: !article.deletedAt ? null : article.deletedAt
    };
    const errors = [];

    for (const key in articleOrError) {
      if (articleOrError[key] instanceof Error) {
        errors.push(articleOrError[key].message);
      }
    }

    if (errors.length) {
      throw new _errors.EntityError(...errors);
    }

    const categoriesAreTheSame = this.categoriesAreTheSame(articleOrError.categoriesId);
    const categoriesIsFull = this.categoriesIsFull(articleOrError.categoriesId);

    if (categoriesAreTheSame || categoriesIsFull) {
      throw new _errors.EntityError('Maximum of different categories are 5');
    }

    return new Article(articleOrError);
  }

  static categoriesAreTheSame(categories) {
    const categoriesIdAsString = categories.map(id => id.value);
    const categoriesRepeated = categoriesIdAsString.filter(id => categoriesIdAsString.indexOf(id) !== categoriesIdAsString.lastIndexOf(id));
    return !!categoriesRepeated.length;
  }

  static categoriesIsFull(categories) {
    return categories.length > 5;
  }

  updateCategories(categories) {
    if (Article.categoriesAreTheSame(categories) || Article.categoriesIsFull(this._categoriesId)) {
      throw new _errors.EntityError('Maximum of different categories are 5');
    }

    this._categoriesId = categories;
    this._updatedAt = new Date();
  }

  updateText(text) {
    if (this._text.equals(text)) return;
    this._text = text;
    this._updatedAt = new Date();
  }

  updateThumbnail(thumbnail) {
    if (thumbnail === null) {
      this._thumbnail = thumbnail;
      this._updatedAt = new Date();
      return;
    }

    if (this._thumbnail && this._thumbnail.equals(thumbnail)) {
      return;
    }

    this._thumbnail = thumbnail;
    this._updatedAt = new Date();
  }

  updateTitle(title, slug) {
    if (this._title.equals(title) && this._slug.equals(slug)) return;
    this._title = title;
    this._slug = slug;
    this._updatedAt = new Date();
  }

  makePublic() {
    if (!this._isPublic) {
      this._isPublic = true;
      this._updatedAt = new Date();
    }
  }

  makePrivate() {
    if (this._isPublic) {
      this._isPublic = false;
      this._updatedAt = new Date();
    }
  }

  delete() {
    if (!this._deletedAt) {
      const date = new Date();
      this._deletedAt = date;
      this._updatedAt = date;
    }
  }

  recover() {
    if (this._deletedAt) {
      this._deletedAt = null;
      this._updatedAt = new Date();
    }
  }

}

exports.Article = Article;