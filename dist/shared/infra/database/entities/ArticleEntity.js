"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArticleEntity = void 0;

var _CategoryEntity = require("./CategoryEntity");

var _typeorm = require("typeorm");

var _UserEntity = require("./UserEntity");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let ArticleEntity = (_dec = (0, _typeorm.Entity)('articles'), _dec2 = (0, _typeorm.PrimaryColumn)(), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)({
  unique: true
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)(), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)({
  unique: true
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)({
  default: false
}), _dec11 = Reflect.metadata("design:type", Boolean), _dec12 = (0, _typeorm.Column)(), _dec13 = Reflect.metadata("design:type", String), _dec14 = (0, _typeorm.ManyToOne)(() => _UserEntity.UserEntity), _dec15 = (0, _typeorm.JoinColumn)({
  name: 'userId',
  referencedColumnName: 'id'
}), _dec16 = Reflect.metadata("design:type", typeof _UserEntity.UserEntity === "undefined" ? Object : _UserEntity.UserEntity), _dec17 = (0, _typeorm.RelationId)('categories'), _dec18 = Reflect.metadata("design:type", Array), _dec19 = (0, _typeorm.ManyToMany)(() => _CategoryEntity.CategoryEntity), _dec20 = (0, _typeorm.JoinTable)({
  name: 'articleCategories',
  joinColumn: {
    name: 'articleId'
  },
  inverseJoinColumn: {
    name: 'categoryId'
  }
}), _dec21 = Reflect.metadata("design:type", Array), _dec22 = (0, _typeorm.Column)({
  type: 'varchar',
  nullable: true,
  default: null
}), _dec23 = Reflect.metadata("design:type", String), _dec24 = (0, _typeorm.CreateDateColumn)(), _dec25 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec26 = (0, _typeorm.UpdateDateColumn)(), _dec27 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec28 = (0, _typeorm.DeleteDateColumn)(), _dec29 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class ArticleEntity {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "title", _descriptor2, this);

    _initializerDefineProperty(this, "text", _descriptor3, this);

    _initializerDefineProperty(this, "slug", _descriptor4, this);

    _initializerDefineProperty(this, "isPublic", _descriptor5, this);

    _initializerDefineProperty(this, "userId", _descriptor6, this);

    _initializerDefineProperty(this, "user", _descriptor7, this);

    _initializerDefineProperty(this, "categoriesId", _descriptor8, this);

    _initializerDefineProperty(this, "categories", _descriptor9, this);

    _initializerDefineProperty(this, "thumbnail", _descriptor10, this);

    _initializerDefineProperty(this, "createdAt", _descriptor11, this);

    _initializerDefineProperty(this, "updatedAt", _descriptor12, this);

    _initializerDefineProperty(this, "deletedAt", _descriptor13, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "text", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "slug", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isPublic", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec14, _dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "categoriesId", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "categories", [_dec19, _dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "thumbnail", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "createdAt", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "updatedAt", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "deletedAt", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.ArticleEntity = ArticleEntity;