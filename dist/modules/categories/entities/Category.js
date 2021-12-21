"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = void 0;

var _Entity = require("../../../shared/core/entities/Entity");

var _CategoryName = require("../../../shared/core/entities/valueObjects/CategoryName");

var _Identifier = require("../../../shared/core/entities/valueObjects/Identifier");

var _Slug = require("../../../shared/core/entities/valueObjects/Slug");

var _errors = require("../../../shared/core/errors");

class Category extends _Entity.Entity {
  get name() {
    return this._name;
  }

  get slug() {
    return this._slug;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  constructor(props) {
    super(props);
    this._name = void 0;
    this._slug = void 0;
    this._createdAt = void 0;
    this._updatedAt = void 0;
    this._name = props.name;
    this._slug = props.slug;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  static create(props) {
    const categoryOrError = {
      id: _Identifier.Identifier.create(props.id),
      name: _CategoryName.CategoryName.create(props.name),
      slug: _Slug.Slug.create(props.slug),
      createdAt: !props.createdAt ? new Date() : props.createdAt,
      updatedAt: !props.updatedAt ? new Date() : props.updatedAt
    };
    const errors = [];

    for (const key in categoryOrError) {
      if (categoryOrError[key] instanceof Error) {
        errors.push(categoryOrError[key].message);
      }
    }

    if (errors.length) throw new _errors.EntityError(...errors);
    return new Category(categoryOrError);
  }

  updateName(name, slug) {
    if (this._name.equals(name)) return;
    this._name = name;
    this._slug = slug;
    this._updatedAt = new Date();
  }

}

exports.Category = Category;