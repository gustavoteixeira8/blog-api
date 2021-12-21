"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateArticleCategories1638557259285 = void 0;

var _typeorm = require("typeorm");

class CreateArticleCategories1638557259285 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'articleCategories',
      columns: [{
        name: 'articleId',
        type: 'varchar',
        isPrimary: true
      }, {
        name: 'categoryId',
        type: 'varchar',
        isPrimary: true
      }],
      foreignKeys: [{
        name: 'ArticleFKArticleCategories',
        columnNames: ['articleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'articles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }, {
        name: 'CategoryFKArticleCategories',
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('articleCategories');
  }

}

exports.CreateArticleCategories1638557259285 = CreateArticleCategories1638557259285;