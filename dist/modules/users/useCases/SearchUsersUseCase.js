"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchUsersUseCase = void 0;

var _errors = require("../../../shared/core/errors");

var _tsyringe = require("tsyringe");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _class;

let SearchUsersUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class SearchUsersUseCase {
  constructor(_userRepository) {
    this._userRepository = _userRepository;
  }

  async execute({
    order,
    page,
    perPage,
    adminId,
    username,
    isAdmin
  }) {
    if (!adminId) throw new _errors.MissingParamError('Admin id');
    const adminExists = await this._userRepository.findById(adminId, {
      withDeleted: false
    });

    if (!adminExists || !adminExists.isEmailVerified || !adminExists.isAdmin) {
      throw new _errors.UserIsNotAdminError();
    }

    const take = !perPage || perPage > 20 ? 20 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : {
      createdAt: 'DESC'
    };
    const pagination = {
      order: orderByDefault,
      page: skip,
      perPage: take
    };
    const users = await this._userRepository.search({
      username,
      isAdmin
    }, pagination);
    return users;
  }

}) || _class) || _class) || _class) || _class);
exports.SearchUsersUseCase = SearchUsersUseCase;