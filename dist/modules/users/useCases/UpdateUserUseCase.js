"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _PersonName = require("../../../shared/core/entities/valueObjects/PersonName");

var _Email = require("../../../shared/core/entities/valueObjects/Email");

var _Username = require("../../../shared/core/entities/valueObjects/Username");

var _QueueProviderProtocol = require("../../../shared/providers/queueProvider/QueueProviderProtocol");

var _app = require("../../../config/app");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UpdateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('MailQueueProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserUseCase {
  constructor(_userRepository, _mailQueueProvider) {
    this._userRepository = _userRepository;
    this._mailQueueProvider = _mailQueueProvider;
  }

  async execute({
    userId,
    fullName,
    email,
    username
  }) {
    if (!userId) throw new _errors.MissingParamError('User id');

    if (!fullName && !email && !username) {
      throw new _errors.MissingParamError('Full name, email or username');
    }

    const user = await this._userRepository.findById(userId, {
      withDeleted: false
    });
    if (!user) throw new _errors.UserNotFoundError();

    if (!user.isEmailVerified) {
      throw new _errors.UserEmailIsNotVerifiedError();
    }

    const userToCompare = JSON.stringify(user);

    if (fullName) {
      const fullNameOrError = _PersonName.PersonName.create(fullName);

      if (fullNameOrError instanceof Error) {
        throw new _errors.InvalidFullNameError();
      }

      if (!user.fullName.equals(fullNameOrError)) {
        user.updateFullName(fullNameOrError);
      }
    }

    if (username) {
      const userWithUsernameExists = await this._userRepository.existsWithUsername(username);

      if (userWithUsernameExists && user.username.value !== username) {
        throw new _errors.UsernameAlreadyExistsError();
      }

      const usernameOrError = _Username.Username.create(username);

      if (usernameOrError instanceof Error) {
        throw new _errors.InvalidUsernameError();
      }

      if (!user.username.equals(usernameOrError)) {
        user.updateUsername(usernameOrError);
      }
    }

    if (email) {
      const userWithEmailExists = await this._userRepository.existsWithEmail(email);

      if (userWithEmailExists && user.email.value !== email) {
        throw new _errors.EmailAlreadyExistsError();
      }

      const emailOrError = _Email.Email.create(email);

      if (emailOrError instanceof Error) {
        throw new _errors.InvalidEmailError();
      }

      if (!user.email.equals(emailOrError)) {
        user.updateEmail(emailOrError);
        user.uncheckVerifyEmail();
      }
    }

    const userUpdatedToCompare = JSON.stringify(user);

    if (userUpdatedToCompare !== userToCompare) {
      await Promise.all([this._userRepository.save(user), this._mailQueueProvider.add({
        to: {
          name: user.fullName.value,
          address: user.email.value
        },
        subject: `Your user was updated - ${_app.appConfig.name}`,
        context: {
          user: {
            fullName: user.fullName.value,
            username: user.username.value,
            email: user.email.value
          },
          appConfig: _app.appConfig
        },
        html: {
          filename: 'userUpdate',
          module: 'users'
        }
      })]);
    }
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserUseCase = UpdateUserUseCase;