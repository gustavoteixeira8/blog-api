"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserTable1637156038254 = void 0;

var _typeorm = require("typeorm");

class CreateUserTable1637156038254 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true
      }, {
        name: 'fullName',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'username',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'isAdmin',
        type: 'boolean',
        default: false,
        isNullable: false
      }, {
        name: 'isEmailVerified',
        type: 'boolean',
        default: false,
        isNullable: false
      }, {
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'deletedAt',
        type: 'timestamp',
        default: null,
        isNullable: true
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }

}

exports.CreateUserTable1637156038254 = CreateUserTable1637156038254;