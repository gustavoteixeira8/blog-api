"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerifyUserEmailUseCase = void 0;

var _tsyringe = require("tsyringe");

var _DateProviderProtocol = require("../../../shared/providers/dateProvider/DateProviderProtocol");

var _TokenProviderProtocol = require("../../../shared/providers/tokenProvider/TokenProviderProtocol");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _UserTokenRepositoryProtocol = require("../repositories/UserTokenRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

let VerifyUserEmailUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokenRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('TokenProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _UserTokenRepositoryProtocol.UserTokenRepositoryProtocol === "undefined" ? Object : _UserTokenRepositoryProtocol.UserTokenRepositoryProtocol, typeof _DateProviderProtocol.DateProviderProtocol === "undefined" ? Object : _DateProviderProtocol.DateProviderProtocol, typeof _TokenProviderProtocol.TokenProviderProtocol === "undefined" ? Object : _TokenProviderProtocol.TokenProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class VerifyUserEmailUseCase {
  constructor(_userRepository, _userTokenRepository, _dateProvider, _tokenProvider) {
    this._userRepository = _userRepository;
    this._userTokenRepository = _userTokenRepository;
    this._dateProvider = _dateProvider;
    this._tokenProvider = _tokenProvider;
  }

  async execute({
    token
  }) {
    if (!token) throw new _errors.MissingParamError('Token');
    const tokenExists = await this._userTokenRepository.findByToken(token);

    if (!tokenExists || tokenExists.type !== 'verifyEmail') {
      throw new _errors.InvalidTokenError();
    }

    const tokenIsExpired = this._dateProvider.isAfter(new Date(), tokenExists.expiresIn);

    if (tokenIsExpired) {
      await this._userTokenRepository.delete(tokenExists.id.value);
      throw new _errors.InvalidTokenError();
    }

    try {
      this._tokenProvider.verify(token);
    } catch (error) {
      await this._userTokenRepository.delete(tokenExists.id.value);
      throw new _errors.InvalidTokenError();
    }

    const user = await this._userRepository.findById(tokenExists.userId.value, {
      withDeleted: false
    });

    if (!user || user.isEmailVerified) {
      await this._userTokenRepository.delete(tokenExists.id.value);
      throw new _errors.UserNotFoundError();
    }

    user.verifyEmail();
    await Promise.all([this._userRepository.save(user), this._userTokenRepository.delete(tokenExists.id.value)]);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.VerifyUserEmailUseCase = VerifyUserEmailUseCase;