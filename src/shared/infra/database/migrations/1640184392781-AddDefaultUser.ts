import { BCryptAdapter } from '@shared/adapters/hashAdapter/implementations/BCryptAdapter';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from '../entities/UserEntity';

export class AddDefaultUser1640184392781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create(UserEntity, {
        id: uuid(),
        fullName: process.env.DEFAULT_USER_FULLNAME,
        email: process.env.DEFAULT_USER_EMAIL,
        username: process.env.DEFAULT_USER_USERNAME,
        password: await new BCryptAdapter().generate(process.env.DEFAULT_USER_PASSWORD as string),
        isAdmin: true,
        isEmailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    );
  }

  public async down(): Promise<void> {
    //
  }
}
