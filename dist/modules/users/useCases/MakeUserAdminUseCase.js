"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MakeUserAdminUseCase = void 0;

var _app = require("../../../config/app");

var _errors = require("../../../shared/core/errors");

var _QueueProviderProtocol = require("../../../shared/providers/queueProvider/QueueProviderProtocol");

var _tsyringe = require("tsyringe");

var _UserRepositoryProtocol = require("../repositories/UserRepositoryProtocol");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let MakeUserAdminUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('MailQueueProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UserRepositoryProtocol.UserRepositoryProtocol === "undefined" ? Object : _UserRepositoryProtocol.UserRepositoryProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class MakeUserAdminUseCase {
  constructor(_userRepository, _mailQueueProvider) {
    this._userRepository = _userRepository;
    this._mailQueueProvider = _mailQueueProvider;
  }

  async execute({
    adminId,
    userId
  }) {
    if (!adminId || !userId) throw new _errors.MissingParamError('Admin id and user id');
    const [admin, userToMakeAdmin] = await Promise.all([this._userRepository.findById(adminId, {
      withDeleted: false
    }), this._userRepository.findById(userId, {
      withDeleted: false
    })]);

    if (!admin || !userToMakeAdmin) {
      throw new _errors.UserNotFoundError('Admin or user to make admin not found');
    }

    if (!admin.isAdmin) {
      throw new _errors.UserIsNotAdminError();
    }

    if (!admin.isEmailVerified) {
      throw new _errors.UserEmailIsNotVerifiedError();
    }

    if (userToMakeAdmin.isAdmin) {
      return;
    }

    if (!userToMakeAdmin.isEmailVerified) {
      throw new _errors.UserEmailIsNotVerifiedError();
    }

    userToMakeAdmin.makeAdmin();
    await Promise.all([this._userRepository.save(userToMakeAdmin), this._mailQueueProvider.add([{
      to: {
        name: admin.fullName.value,
        address: admin.email.value
      },
      subject: `You have given admin permission to a new user - ${_app.appConfig.name}`,
      context: {
        user: {
          username: admin.username.value
        },
        userToMakeAdmin: {
          id: userToMakeAdmin.id.value,
          email: userToMakeAdmin.email.value
        },
        appConfig: _app.appConfig
      },
      html: {
        filename: 'adminAddAdmin',
        module: 'users'
      }
    }, {
      to: {
        name: userToMakeAdmin.fullName.value,
        address: userToMakeAdmin.email.value
      },
      subject: `Now you are an admin - ${_app.appConfig.name}`,
      context: {
        user: {
          username: userToMakeAdmin.username.value
        },
        adminUsername: admin.username.value,
        appConfig: _app.appConfig
      },
      html: {
        filename: 'userAddAdmin',
        module: 'users'
      }
    }])]);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.MakeUserAdminUseCase = MakeUserAdminUseCase;