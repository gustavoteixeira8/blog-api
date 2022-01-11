"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMapper = void 0;

var _User = require("../entities/user/User");

class UserMapper {
  static toPersistence(user) {
    var _user$id;

    return {
      id: ((_user$id = user.id) === null || _user$id === void 0 ? void 0 : _user$id.value) || '',
      fullName: user.fullName.value,
      email: user.email.value,
      username: user.username.value,
      password: user.password.value,
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt
    };
  }

  static toDomain(user) {
    return _User.User.create(user);
  }

  static toHimself(user) {
    var _user$id2;

    return {
      id: ((_user$id2 = user.id) === null || _user$id2 === void 0 ? void 0 : _user$id2.value) || '',
      fullName: user.fullName.value,
      email: user.email.value,
      username: user.username.value,
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt
    };
  }

  static toDetails(user) {
    return {
      id: user.id.value,
      username: user.username.value
    };
  }

}

exports.UserMapper = UserMapper;