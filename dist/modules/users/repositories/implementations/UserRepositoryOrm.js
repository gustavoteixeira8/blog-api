"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepositoryOrm = void 0;

var _typeorm = require("typeorm");

var _UserMapper = require("../../mappers/UserMapper");

var _UserEntity = require("../../../../shared/infra/database/entities/UserEntity");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UserRepositoryOrm {
  constructor() {
    _defineProperty(this, "_table", (0, _typeorm.getRepository)(_UserEntity.UserEntity));
  }

  async save(user) {
    const userMapped = _UserMapper.UserMapper.toPersistence(user);

    await this._table.save(userMapped);
  }

  async delete(userId) {
    const userWithRelations = await this._table.findOne(userId, {
      join: {
        alias: 'u',
        leftJoinAndSelect: {
          article: 'u.articles'
        }
      },
      withDeleted: true
    });
    if (!userWithRelations) return;
    await this._table.remove(userWithRelations);
  }

  async recover(userId) {
    const userWithRelations = await this._table.findOne(userId, {
      join: {
        alias: 'u',
        leftJoinAndSelect: {
          article: 'u.articles'
        }
      },
      withDeleted: true
    });
    if (!userWithRelations) return;
    await this._table.recover(userWithRelations);
  }

  async softDelete(userId) {
    const userWithRelations = await this._table.findOne(userId, {
      join: {
        alias: 'u',
        leftJoinAndSelect: {
          article: 'u.articles'
        }
      }
    });
    if (!userWithRelations) return;
    await this._table.softRemove(userWithRelations);
  }

  async findByEmail(email, options) {
    const user = await this._table.findOne({
      where: {
        email
      },
      ...options
    });
    if (!user) return;
    return _UserMapper.UserMapper.toDomain(user);
  }

  async findByUsername(username, options) {
    const user = await this._table.findOne({
      where: {
        username
      },
      ...options
    });
    if (!user) return;
    return _UserMapper.UserMapper.toDomain(user);
  }

  async findAllDeleted() {
    const users = await this._table.find({
      where: {
        deletedAt: (0, _typeorm.Not)((0, _typeorm.IsNull)()),
        isEmailVerified: true
      },
      take: 100,
      withDeleted: true
    });
    return users.map(_UserMapper.UserMapper.toDomain);
  }

  async findById(userId, options) {
    const user = await this._table.findOne(userId, { ...options
    });
    if (!user) return;
    return _UserMapper.UserMapper.toDomain(user);
  }

  async search(searchOptions, pagination) {
    const {
      order,
      page,
      perPage
    } = pagination;
    const {
      username,
      isAdmin
    } = searchOptions;
    const [users, count] = await this._table.findAndCount({
      where: { ...(username ? {
          username: (0, _typeorm.Like)(`%${username}%`)
        } : null),
        ...(isAdmin !== undefined ? {
          isAdmin
        } : null)
      },
      order,
      withDeleted: true,
      skip: page,
      take: perPage
    });
    return {
      data: users.map(_UserMapper.UserMapper.toDomain),
      page: Math.ceil(page / perPage + 1),
      perPage,
      order: order || null,
      maxItems: count,
      maxPage: Math.ceil(count / perPage)
    };
  }

  async existsWithEmail(email) {
    const emailExists = await this._table.findOne({
      where: {
        email
      },
      withDeleted: true
    });
    return !!emailExists;
  }

  async existsWithUsername(username) {
    const usernameExists = await this._table.findOne({
      where: {
        username
      },
      withDeleted: true
    });
    return !!usernameExists;
  }

}

exports.UserRepositoryOrm = UserRepositoryOrm;