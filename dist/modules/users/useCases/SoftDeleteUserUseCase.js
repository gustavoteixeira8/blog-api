"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftDeleteUserUseCase = void 0;

var _app = require("../../../config/app");

var _errors = require("../../../shared/core/errors");

var _QueueProviderProtocol = require("../../../shared/providers/queueProvider/QueueProviderProtocol");

var _tsyringe = require("tsyringe");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let SoftDeleteUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('MailQueueProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class SoftDeleteUserUseCase {
  constructor(_userRepository, _mailQueueProvider) {
    this._userRepository = _userRepository;
    this._mailQueueProvider = _mailQueueProvider;
  }

  async execute({
    userId
  }) {
    if (!userId) throw new _errors.MissingParamError('User id');
    const userExists = await this._userRepository.findById(userId, {
      withDeleted: false
    });

    if (!userExists) {
      throw new _errors.UserNotFoundError();
    }

    if (!userExists.isEmailVerified) {
      throw new _errors.UserEmailIsNotVerifiedError();
    }

    userExists.delete();
    await Promise.all([this._userRepository.softDelete(userExists.id.value), this._mailQueueProvider.add({
      to: {
        name: userExists.fullName.value,
        address: userExists.email.value
      },
      subject: `Your user will be deleted in 1 month - ${_app.appConfig.name}`,
      context: {
        user: {
          username: userExists.username.value,
          email: userExists.email.value,
          fullName: userExists.fullName.value
        },
        appConfig: _app.appConfig
      },
      html: {
        filename: 'userSoftDelete',
        module: 'users'
      }
    })]);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.SoftDeleteUserUseCase = SoftDeleteUserUseCase;