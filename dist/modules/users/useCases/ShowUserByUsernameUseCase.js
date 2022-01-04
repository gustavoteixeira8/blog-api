"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowUserByUsernameUseCase = void 0;

var _errors = require("../../../shared/core/errors");

var _tsyringe = require("tsyringe");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _class;

let ShowUserByUsernameUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowUserByUsernameUseCase {
  constructor(_userRepository) {
    this._userRepository = _userRepository;
  }

  async execute({
    username
  }) {
    if (!username) throw new _errors.MissingParamError('Username');
    const user = await this._userRepository.findByUsername(username, {
      withDeleted: false
    });
    if (!user) throw new _errors.UserNotFoundError();
    return user;
  }

}) || _class) || _class) || _class) || _class);
exports.ShowUserByUsernameUseCase = ShowUserByUsernameUseCase;