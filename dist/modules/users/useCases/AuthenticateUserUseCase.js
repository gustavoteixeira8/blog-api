"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _Email = require("../../../shared/core/entities/valueObjects/Email");

var _DateProviderProtocol = require("../../../shared/providers/dateProvider/DateProviderProtocol");

var _HashProviderProtocol = require("../../../shared/providers/hashProvider/HashProviderProtocol");

var _TokenProviderProtocol = require("../../../shared/providers/tokenProvider/TokenProviderProtocol");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('TokenProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _TokenProviderProtocol.TokenProviderProtocol === "undefined" ? Object : _TokenProviderProtocol.TokenProviderProtocol, typeof _DateProviderProtocol.DateProviderProtocol === "undefined" ? Object : _DateProviderProtocol.DateProviderProtocol, typeof _HashProviderProtocol.HashProviderProtocol === "undefined" ? Object : _HashProviderProtocol.HashProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class AuthenticateUserUseCase {
  constructor(_userRepository, _tokenProvider, _dateProvider, _hashProvider) {
    this._userRepository = _userRepository;
    this._tokenProvider = _tokenProvider;
    this._dateProvider = _dateProvider;
    this._hashProvider = _hashProvider;
  }

  async execute({
    login,
    password
  }) {
    if (!login || !password) throw new _errors.MissingParamError('Login and password');

    const isEmail = _Email.Email.validate(login);

    let user;

    if (isEmail) {
      user = await this._userRepository.findByEmail(login, {
        withDeleted: true
      });
    } else {
      user = await this._userRepository.findByUsername(login, {
        withDeleted: true
      });
    }

    if (!user) throw new _errors.LoginOrPasswordInvalidError();
    if (!user.isEmailVerified) throw new _errors.LoginOrPasswordInvalidError();
    const isValidPassword = await this._hashProvider.compare(password, user.password.value);
    if (!isValidPassword) throw new _errors.LoginOrPasswordInvalidError();

    const tokenExpiresIn = this._dateProvider.add(new Date(), {
      days: 1
    });

    const accessToken = this._tokenProvider.sign({
      id: user.id.value,
      expiresIn: tokenExpiresIn
    }, {
      expiresIn: '1d'
    });

    const userIsDeleted = !!user.deletedAt;

    if (userIsDeleted) {
      user.recover();
      await this._userRepository.recover(user.id.value);
    }

    return {
      accessToken,
      expiresIn: tokenExpiresIn,
      userId: user.id.value,
      userIsRecovered: userIsDeleted !== !!user.deletedAt
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;