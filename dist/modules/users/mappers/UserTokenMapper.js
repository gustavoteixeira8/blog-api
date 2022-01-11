"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTokenMapper = void 0;

var _UserToken = require("../entities/userToken/UserToken");

class UserTokenMapper {
  static toPersistence(userToken) {
    var _userToken$id;

    return {
      id: (_userToken$id = userToken.id) === null || _userToken$id === void 0 ? void 0 : _userToken$id.value,
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