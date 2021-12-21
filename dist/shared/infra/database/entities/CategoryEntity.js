"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryEntity = void 0;

var _typeorm = require("typeorm");

var _ArticleEntity = require("./ArticleEntity");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let CategoryEntity = (_dec = (0, _typeorm.Entity)({
  name: 'categories'
}), _dec2 = (0, _typeorm.PrimaryColumn)(), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)({
  unique: true
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)({
  unique: true
}), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.ManyToMany)(() => _ArticleEntity.ArticleEntity), _dec9 = (0, _typeorm.JoinTable)({
  name: 'articleCategories',
  joinColumn: {
    name: 'categoryId'
  },
  inverseJoinColumn: {
    name: 'articleId'
  }
}), _dec10 = Reflect.metadata("design:type", Array), _dec11 = (0, _typeorm.CreateDateColumn)(), _dec12 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec13 = (0, _typeorm.UpdateDateColumn)(), _dec14 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class CategoryEntity {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "name", _descriptor2, this);

    _initializerDefineProperty(this, "slug", _descriptor3, this);

    _initializerDefineProperty(this, "articles", _descriptor4, this);

    _initializerDefineProperty(this, "createdAt", _descriptor5, this);

    _initializerDefineProperty(this, "updatedAt", _descriptor6, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "slug", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "articles", [_dec8, _dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "createdAt", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "updatedAt", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.CategoryEntity = CategoryEntity;