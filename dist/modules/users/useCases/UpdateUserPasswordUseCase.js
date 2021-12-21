"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserPasswordUseCase = void 0;

var _tsyringe = require("tsyringe");

var _QueueProviderProtocol = require("../../../shared/providers/queueProvider/QueueProviderProtocol");

var _TokenProviderProtocol = require("../../../shared/providers/tokenProvider/TokenProviderProtocol");

var _DateProviderProtocol = require("../../../shared/providers/dateProvider/DateProviderProtocol");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _Password = require("../../../shared/core/entities/valueObjects/Password");

var _HashProviderProtocol = require("../../../shared/providers/hashProvider/HashProviderProtocol");

var _app = require("../../../config/app");

var _UserTokenRepositoryProtocol = require("../repositories/UserTokenRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class;

let UpdateUserPasswordUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokenRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('TokenProvider')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 4);
}, _dec7 = function (target, key) {
  return (0, _tsyringe.inject)('MailQueueProvider')(target, undefined, 5);
}, _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _UserTokenRepositoryProtocol.UserTokenRepositoryProtocol === "undefined" ? Object : _UserTokenRepositoryProtocol.UserTokenRepositoryProtocol, typeof _DateProviderProtocol.DateProviderProtocol === "undefined" ? Object : _DateProviderProtocol.DateProviderProtocol, typeof _TokenProviderProtocol.TokenProviderProtocol === "undefined" ? Object : _TokenProviderProtocol.TokenProviderProtocol, typeof _HashProviderProtocol.HashProviderProtocol === "undefined" ? Object : _HashProviderProtocol.HashProviderProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = class UpdateUserPasswordUseCase {
  constructor(_userRepository, _userTokenRepository, _dateProvider, _tokenProvider, _hashProvider, _mailQueueProvider) {
    this._userRepository = _userRepository;
    this._userTokenRepository = _userTokenRepository;
    this._dateProvider = _dateProvider;
    this._tokenProvider = _tokenProvider;
    this._hashProvider = _hashProvider;
    this._mailQueueProvider = _mailQueueProvider;
  }

  async execute({
    password,
    confirmPassword,
    token
  }) {
    if (!token) throw new _errors.MissingParamError('Token');

    if (!password || !confirmPassword) {
      throw new _errors.MissingParamError('Password and confirm password');
    }

    if (password !== confirmPassword) {
      throw new _errors.PasswordMustBeEqualConfirmPasswordError();
    }

    const userToken = await this._userTokenRepository.findByToken(token);

    if (!userToken || userToken.type !== 'updatePassword') {
      throw new _errors.InvalidTokenError();
    }

    const tokenIsExpired = this._dateProvider.isAfter(new Date(), userToken.expiresIn);

    if (tokenIsExpired) {
      await this._userTokenRepository.delete(userToken.id.value);
      throw new _errors.InvalidTokenError();
    }

    try {
      this._tokenProvider.verify(userToken.token.value);
    } catch (error) {
      await this._userTokenRepository.delete(userToken.id.value);
      throw new _errors.InvalidTokenError();
    }

    const user = await this._userRepository.findById(userToken.userId.value, {
      withDeleted: false
    });

    if (!user) {
      throw new _errors.UserNotFoundError();
    }

    if (!user.isEmailVerified) {
      throw new _errors.UserEmailIsNotVerifiedError();
    }

    const isTheSamePassword = await this._hashProvider.compare(password, user.password.value);

    if (isTheSamePassword) {
      throw new _errors.InvalidPasswordError();
    }

    const isValidPassword = _Password.Password.create(password, false);

    if (isValidPassword instanceof Error) {
      throw new _errors.InvalidPasswordError();
    }

    const hash = await this._hashProvider.generate(password);
    user.updatePassword(_Password.Password.create(hash, true));
    await Promise.all([this._userRepository.save(user), this._userTokenRepository.delete(userToken.id.value), this._mailQueueProvider.add({
      to: {
        name: user.fullName.value,
        address: user.email.value
      },
      subject: `Your password was updated - ${_app.appConfig.name}`,
      context: {
        user: {
          fullName: user.fullName.value,
          username: user.username.value,
          email: user.email.value
        },
        appConfig: _app.appConfig
      },
      html: {
        filename: 'userUpdatePassword',
        module: 'users'
      }
    })]);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserPasswordUseCase = UpdateUserPasswordUseCase;