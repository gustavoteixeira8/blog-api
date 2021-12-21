"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryTable1638367356279 = void 0;

var _typeorm = require("typeorm");

class CreateCategoryTable1638367356279 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'categories',
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar',
        isUnique: true,
        isNullable: false
      }, {
        name: 'slug',
        type: 'varchar',
        isUnique: true,
        isNullable: false
      }, {
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('categories');
  }

}

exports.CreateCategoryTable1638367356279 = CreateCategoryTable1638367356279;