"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _HashProviderProtocol = require("../../../shared/providers/hashProvider/HashProviderProtocol");

var _QueueProviderProtocol = require("../../../shared/providers/queueProvider/QueueProviderProtocol");

var _app = require("../../../config/app");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _Password = require("../../../shared/core/entities/valueObjects/Password");

var _User = require("../entities/user/User");

var _errors = require("../../../shared/core/errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('MailQueueProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _HashProviderProtocol.HashProviderProtocol === "undefined" ? Object : _HashProviderProtocol.HashProviderProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateUserUseCase {
  constructor(_userRepository, _hashProvider, _mailQueueProvider) {
    this._userRepository = _userRepository;
    this._hashProvider = _hashProvider;
    this._mailQueueProvider = _mailQueueProvider;
  }

  async execute({
    fullName,
    email,
    password,
    username
  }) {
    if (!fullName || !email || !password || !username) {
      throw new _errors.MissingParamError('Full name, email, username and password');
    }

    const [emailExists, usernameExists] = await Promise.all([this._userRepository.existsWithEmail(email), this._userRepository.existsWithUsername(username)]);

    if (emailExists) {
      throw new _errors.EmailAlreadyExistsError();
    }

    if (usernameExists) {
      throw new _errors.UsernameAlreadyExistsError();
    }

    const user = _User.User.create({
      fullName,
      email,
      username,
      password,
      isEmailVerified: false,
      isAdmin: false
    });

    const hash = await this._hashProvider.generate(user.password.value);

    const passwordHash = _Password.Password.create(hash, true);

    user.updatePassword(passwordHash);
    await Promise.all([this._userRepository.save(user), this._mailQueueProvider.add({
      to: {
        name: user.fullName.value,
        address: user.email.value
      },
      subject: `Welcome to ${_app.appConfig.name}`,
      context: {
        user: {
          username: user.username.value
        },
        appConfig: _app.appConfig
      },
      html: {
        filename: 'welcome',
        module: 'users'
      }
    })]);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;