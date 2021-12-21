"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserTokenTable1637287265748 = void 0;

var _typeorm = require("typeorm");

class CreateUserTokenTable1637287265748 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'userTokens',
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true
      }, {
        name: 'token',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'type',
        type: 'enum',
        enum: ['updatePassword', 'verifyEmail'],
        isUnique: true
      }, {
        name: 'userId',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'expiresIn',
        type: 'timestamp'
      }, {
        name: 'createdAt',
        type: 'timestamp'
      }],
      foreignKeys: [{
        name: 'UserTokenFK',
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('userTokens');
  }

}

exports.CreateUserTokenTable1637287265748 = CreateUserTokenTable1637287265748;