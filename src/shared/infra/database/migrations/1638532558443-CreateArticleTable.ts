import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArticleTable1638367356279 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'text',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'isPublic',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'ArticleUserFK',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articles');
  }
}
