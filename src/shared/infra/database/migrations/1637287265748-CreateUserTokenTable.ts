import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTokenTable1637287265748 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userTokens',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'token',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['updatePassword', 'verifyEmail'],
          },
          {
            name: 'userId',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'expiresIn',
            type: 'timestamp',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'UserTokenFK',
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userTokens');
  }
}
