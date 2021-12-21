"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendUpdatePasswordEmailUseCase = void 0;

var _tsyringe = require("tsyringe");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _DateProviderProtocol = require("../../../shared/providers/dateProvider/DateProviderProtocol");

var _TokenProviderProtocol = require("../../../shared/providers/tokenProvider/TokenProviderProtocol");

var _QueueProviderProtocol = require("../../../shared/providers/queueProvider/QueueProviderProtocol");

var _app = require("../../../config/app");

var _UserToken = require("../entities/userToken/UserToken");

var _UserTokenRepositoryProtocol = require("../repositories/UserTokenRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

let SendUpdatePasswordEmailUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokenRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('TokenProvider')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('MailQueueProvider')(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _UserTokenRepositoryProtocol.UserTokenRepositoryProtocol === "undefined" ? Object : _UserTokenRepositoryProtocol.UserTokenRepositoryProtocol, typeof _DateProviderProtocol.DateProviderProtocol === "undefined" ? Object : _DateProviderProtocol.DateProviderProtocol, typeof _TokenProviderProtocol.TokenProviderProtocol === "undefined" ? Object : _TokenProviderProtocol.TokenProviderProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class SendUpdatePasswordEmailUseCase {
  constructor(_userRepository, _userTokenRepository, _dateProvider, _tokenProvider, _mailQueueProvider) {
    this._userRepository = _userRepository;
    this._userTokenRepository = _userTokenRepository;
    this._dateProvider = _dateProvider;
    this._tokenProvider = _tokenProvider;
    this._mailQueueProvider = _mailQueueProvider;
  }

  async execute({
    email
  }) {
    if (!email) throw new _errors.MissingParamError('Email');
    const user = await this._userRepository.findByEmail(email, {
      withDeleted: false
    });
    if (!user || !user.isEmailVerified) return;
    const userToken = await this._userTokenRepository.findByUserId(user.id.value);

    if (userToken) {
      const tokenIsExpired = this._dateProvider.isAfter(new Date(), userToken.expiresIn);

      if (!tokenIsExpired) return;
      await this._userTokenRepository.delete(userToken.id.value);
    }

    const tokenExpiresIn = this._dateProvider.add(new Date(), {
      minutes: 15
    });

    const token = this._tokenProvider.sign({}, {
      expiresIn: '15m'
    });

    const newUserToken = _UserToken.UserToken.create({
      userId: user.id.value,
      expiresIn: tokenExpiresIn,
      token,
      type: 'updatePassword'
    });

    await Promise.all([this._userTokenRepository.save(newUserToken), this._mailQueueProvider.add({
      to: {
        name: user.fullName.value,
        address: user.email.value
      },
      subject: `Password recovery - ${_app.appConfig.name}`,
      context: {
        user: {
          username: user.username.value
        },
        token,
        tokenExpires: tokenExpiresIn,
        appConfig: _app.appConfig
      },
      html: {
        filename: 'sendEmailUserUpdatePassword',
        module: 'users'
      }
    })]);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.SendUpdatePasswordEmailUseCase = SendUpdatePasswordEmailUseCase;