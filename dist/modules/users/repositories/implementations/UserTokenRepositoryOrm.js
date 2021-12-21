"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTokenRepositoryOrm = void 0;

var _UserTokenMapper = require("../../mappers/UserTokenMapper");

var _UserTokenEntity = require("../../../../shared/infra/database/entities/UserTokenEntity");

var _typeorm = require("typeorm");

class UserTokenRepositoryOrm {
  constructor() {
    this._table = (0, _typeorm.getRepository)(_UserTokenEntity.UserTokenEntity);
  }

  async save(userToken) {
    const userTokenMapped = _UserTokenMapper.UserTokenMapper.toPersistence(userToken);

    await this._table.save(userTokenMapped);
  }

  async delete(tokenId) {
    await this._table.delete(tokenId);
  }

  async findById(tokenId, options) {
    const userToken = await this._table.findOne({
      where: {
        id: tokenId
      },
      ...options
    });
    if (!userToken) return;
    return _UserTokenMapper.UserTokenMapper.toDomain(userToken);
  }

  async findByUserId(userId, options) {
    const userToken = await this._table.findOne({
      where: {
        userId
      },
      ...options
    });
    if (!userToken) return;
    return _UserTokenMapper.UserTokenMapper.toDomain(userToken);
  }

  async findByToken(token, options) {
    const userToken = await this._table.findOne({
      where: {
        token
      },
      ...options
    });
    if (!userToken) return;
    return _UserTokenMapper.UserTokenMapper.toDomain(userToken);
  }

}

exports.UserTokenRepositoryOrm = UserTokenRepositoryOrm;