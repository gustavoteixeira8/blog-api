"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTokenMapper = void 0;

var _UserToken = require("../entities/userToken/UserToken");

class UserTokenMapper {
  static toPersistence(userToken) {
    return {
      id: userToken.id?.value,
      token: userToken.token.value,
      type: userToken.type,
      userId: userToken.userId.value,
      expiresIn: userToken.expiresIn,
      createdAt: userToken.createdAt
    };
  }

  static toDomain(userToken) {
    return _UserToken.UserToken.create(userToken);
  }

}

exports.UserTokenMapper = UserTokenMapper;