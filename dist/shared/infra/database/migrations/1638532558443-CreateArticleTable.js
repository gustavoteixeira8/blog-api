"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateArticleTable1638367356279 = void 0;

var _typeorm = require("typeorm");

class CreateArticleTable1638367356279 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'articles',
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true
      }, {
        name: 'title',
        type: 'varchar',
        isNullable: false,
        isUnique: true
      }, {
        name: 'text',
        type: 'text',
        isNullable: false
      }, {
        name: 'slug',
        type: 'varchar',
        isNullable: false,
        isUnique: true
      }, {
        name: 'isPublic',
        type: 'boolean',
        isNullable: false,
        default: false
      }, {
        name: 'userId',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'thumbnail',
        type: 'varchar',
        default: null,
        isNullable: true
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
      }],
      foreignKeys: [{
        name: 'ArticleUserFK',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('articles');
  }

}

exports.CreateArticleTable1638367356279 = CreateArticleTable1638367356279;