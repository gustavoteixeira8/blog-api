"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAllUsersUseCase = void 0;

var _tsyringe = require("tsyringe");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _DateProviderProtocol = require("../../../shared/providers/dateProvider/DateProviderProtocol");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let DeleteAllUsersUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _DateProviderProtocol.DateProviderProtocol === "undefined" ? Object : _DateProviderProtocol.DateProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteAllUsersUseCase {
  constructor(_userRepository, _dateProvider) {
    this._userRepository = _userRepository;
    this._dateProvider = _dateProvider;
  }

  async execute() {
    const users = await this._userRepository.findAllDeleted();

    for (const user of users) {
      if (!user.deletedAt) continue;

      const deletedAtPlusOneMonth = this._dateProvider.add(user.deletedAt, {
        months: 1
      });

      if (deletedAtPlusOneMonth.getTime() > new Date().getTime()) continue;
      await this._userRepository.delete(user.id.value);
    }
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.DeleteAllUsersUseCase = DeleteAllUsersUseCase;