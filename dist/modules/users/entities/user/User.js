"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _Username = require("../../../../shared/core/entities/valueObjects/Username");

var _Entity = require("../../../../shared/core/entities/Entity");

var _Email = require("../../../../shared/core/entities/valueObjects/Email");

var _Password = require("../../../../shared/core/entities/valueObjects/Password");

var _PersonName = require("../../../../shared/core/entities/valueObjects/PersonName");

var _errors = require("../../../../shared/core/errors");

var _Identifier = require("../../../../shared/core/entities/valueObjects/Identifier");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class User extends _Entity.Entity {
  get fullName() {
    return this._fullName;
  }

  get email() {
    return this._email;
  }

  get username() {
    return this._username;
  }

  get password() {
    return this._password;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get isEmailVerified() {
    return this._isEmailVerified;
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

    _defineProperty(this, "_fullName", void 0);

    _defineProperty(this, "_email", void 0);

    _defineProperty(this, "_username", void 0);

    _defineProperty(this, "_password", void 0);

    _defineProperty(this, "_isAdmin", void 0);

    _defineProperty(this, "_isEmailVerified", void 0);

    _defineProperty(this, "_createdAt", void 0);

    _defineProperty(this, "_updatedAt", void 0);

    _defineProperty(this, "_deletedAt", void 0);

    this._fullName = props.fullName;
    this._email = props.email;
    this._username = props.username;
    this._password = props.password;
    this._isAdmin = props.isAdmin;
    this._isEmailVerified = props.isEmailVerified;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._deletedAt = props.deletedAt;
  }

  static create(props) {
    const isNewUser = !props.id;
    const dateNow = new Date();
    const userOrError = {
      id: _Identifier.Identifier.create(props.id),
      fullName: _PersonName.PersonName.create(props.fullName),
      email: _Email.Email.create(props.email),
      username: _Username.Username.create(props.username),
      password: _Password.Password.create(props.password, !isNewUser),
      isAdmin: props.isAdmin,
      isEmailVerified: isNewUser ? false : props.isEmailVerified,
      createdAt: !props.createdAt ? dateNow : props.createdAt,
      updatedAt: !props.updatedAt ? dateNow : props.updatedAt,
      deletedAt: !props.deletedAt ? null : props.deletedAt
    };
    const errors = [];

    for (const key in userOrError) {
      if (userOrError[key] instanceof Error) {
        errors.push(userOrError[key].message);
      }
    }

    if (errors.length) throw new _errors.EntityError(...errors);
    return new User(userOrError);
  }

  delete() {
    if (this._deletedAt) return;
    const date = new Date();
    this._deletedAt = date;
    this._updatedAt = date;
  }

  recover() {
    if (!this._deletedAt) return;
    this._deletedAt = null;
    this._updatedAt = new Date();
  }

  updateFullName(name) {
    if (this._fullName.equals(name)) {
      return;
    }

    this._fullName = name;
    this._updatedAt = new Date();
  }

  updateEmail(email) {
    if (this._email.equals(email)) {
      return;
    }

    this._email = email;
    this._updatedAt = new Date();
    this.uncheckVerifyEmail();
  }

  updateUsername(username) {
    if (this._username.equals(username)) {
      return;
    }

    this._username = username;
    this._updatedAt = new Date();
  }

  updatePassword(password) {
    if (this._password.equals(password)) {
      return;
    }

    this._password = password;
    this._updatedAt = new Date();
  }

  makeAdmin() {
    this._isAdmin = true;
    this._updatedAt = new Date();
  }

  removeAdmin() {
    this._isAdmin = false;
    this._updatedAt = new Date();
  }

  verifyEmail() {
    if (!this._isEmailVerified) {
      this._isEmailVerified = true;
      this._updatedAt = new Date();
    }
  }

  uncheckVerifyEmail() {
    if (this._isEmailVerified) {
      this._isEmailVerified = false;
      this._updatedAt = new Date();
    }
  }

}

exports.User = User;