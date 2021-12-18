import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArticleCategories1638557259285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articleCategories',
        columns: [
          {
            name: 'articleId',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'categoryId',
            type: 'varchar',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'ArticleFKArticleCategories',
            columnNames: ['articleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'articles',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CategoryFKArticleCategories',
            columnNames: ['categoryId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articleCategories');
  }
}
