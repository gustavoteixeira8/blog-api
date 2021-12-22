"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddDefaultUser1640184392781 = void 0;

var _BCryptProvider = require("../../../providers/hashProvider/implementations/BCryptProvider");

var _uuid = require("uuid");

var _UserEntity = require("../entities/UserEntity");

class AddDefaultUser1640184392781 {
  async up(queryRunner) {
    await queryRunner.manager.save(queryRunner.manager.create(_UserEntity.UserEntity, {
      id: (0, _uuid.v4)(),
      fullName: process.env.DEFAULT_USER_FULLNAME,
      email: process.env.DEFAULT_USER_EMAIL,
      username: process.env.DEFAULT_USER_USERNAME,
      password: await new _BCryptProvider.BCryptProvider().generate(process.env.DEFAULT_USER_PASSWORD),
      isAdmin: true,
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }));
  }

  async down() {//
  }

}

exports.AddDefaultUser1640184392781 = AddDefaultUser1640184392781;