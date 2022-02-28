"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserToken = void 0;

var _Entity = require("../../../../shared/core/entities/Entity");

var _ForeignKeyId = require("../../../../shared/core/entities/valueObjects/ForeignKeyId");

var _Identifier = require("../../../../shared/core/entities/valueObjects/Identifier");

var _TokenJWT = require("../../../../shared/core/entities/valueObjects/TokenJWT");

var _errors = require("../../../../shared/core/errors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UserToken extends _Entity.Entity {
  get token() {
    return this._token;
  }

  get type() {
    return this._type;
  }

  get userId() {
    return this._userId;
  }

  get expiresIn() {
    return this._expiresIn;
  }

  get createdAt() {
    return this._createdAt;
  }

  constructor(props) {
    super(props);

    _defineProperty(this, "_token", void 0);

    _defineProperty(this, "_type", void 0);

    _defineProperty(this, "_userId", void 0);

    _defineProperty(this, "_expiresIn", void 0);

    _defineProperty(this, "_createdAt", void 0);

    this._token = props.token;
    this._userId = props.userId;
    this._expiresIn = props.expiresIn;
    this._type = props.type;
    this._createdAt = props.createdAt || new Date();
  }

  static create(props) {
    const tokenOrError = {
      id: _Identifier.Identifier.create(props.id),
      token: _TokenJWT.TokenJWT.create(props.token),
      userId: _ForeignKeyId.ForeignKeyId.create(props.userId),
      type: props.type,
      expiresIn: props.expiresIn,
      createdAt: props.createdAt || new Date()
    };
    const errors = [];

    for (const key in tokenOrError) {
      if (tokenOrError[key] instanceof Error) {
        errors.push(tokenOrError[key].message);
      }
    }

    if (errors.length) throw new _errors.EntityError(...errors);
    const isNewToken = !props.id;

    if (!this.expiresInFuture(props.expiresIn, isNewToken)) {
      throw new _errors.EntityError('Expires in must be in future');
    }

    if (!this.isValidType(props.type)) {
      throw new _errors.EntityError('Token type is invalid');
    }

    return new UserToken(tokenOrError);
  }

  static isValidType(type) {
    const typesOfToken = ['verifyEmail', 'updatePassword'];
    return typesOfToken.findIndex(value => value === type) !== -1;
  }

  static expiresInFuture(expiresIn, firstCreation) {
    if (!firstCreation) return true;
    if (!(expiresIn instanceof Date)) return false;
    const dateInMs = expiresIn.getTime();
    const now = new Date().getTime();
    if (now > dateInMs) return false;
    return true;
  }

}

exports.UserToken = UserToken;