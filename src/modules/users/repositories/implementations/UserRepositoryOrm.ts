import { User } from '@modules/users/entities/user/User';
import { UserProtocol } from '@modules/users/entities/user/UserProtocol';
import { RepositoryOptions } from '@shared/core/repositories/RepositoryOptions';
import { getRepository, IsNull, Like, Not } from 'typeorm';
import { UserMapper } from '../../mappers/UserMapper';
import {
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { SearchUserOptions, UserRepositoryProtocol } from '../UserRepositoryProtocol';
import { UserEntity } from '@shared/infra/database/entities/UserEntity';

export class UserRepositoryOrm implements UserRepositoryProtocol {
  private readonly _table = getRepository(UserEntity);

  public async save(user: UserProtocol): Promise<void> {
    const userMapped = UserMapper.toPersistence(user);

    await this._table.save(userMapped);
  }

  public async delete(userId: string): Promise<void> {
    const userWithRelations = await this._table.findOne(userId, {
      join: { alias: 'u', leftJoinAndSelect: { article: 'u.articles' } },
      withDeleted: true,
    });

    if (!userWithRelations) return;

    await this._table.remove(userWithRelations);
  }

  public async recover(userId: string): Promise<void> {
    const userWithRelations = await this._table.findOne(userId, {
      join: { alias: 'u', leftJoinAndSelect: { article: 'u.articles' } },
      withDeleted: true,
    });

    if (!userWithRelations) return;

    await this._table.recover(userWithRelations);
  }

  public async softDelete(userId: string): Promise<void> {
    const userWithRelations = await this._table.findOne(userId, {
      join: { alias: 'u', leftJoinAndSelect: { article: 'u.articles' } },
    });

    if (!userWithRelations) return;

    await this._table.softRemove(userWithRelations);
  }

  public async findByEmail(email: string, options?: RepositoryOptions): Promise<User | undefined> {
    const user = await this._table.findOne({ where: { email }, ...options });

    if (!user) return;

    return UserMapper.toDomain(user);
  }

  public async findByUsername(
    username: string,
    options?: RepositoryOptions,
  ): Promise<User | undefined> {
    const user = await this._table.findOne({ where: { username }, ...options });

    if (!user) return;

    return UserMapper.toDomain(user);
  }

  public async findAllDeleted(): Promise<User[]> {
    const users = await this._table.find({
      where: { deletedAt: Not(IsNull()), isEmailVerified: true },
      take: 100,
      withDeleted: true,
    });

    return users.map(UserMapper.toDomain);
  }

  public async findById(userId: string, options?: RepositoryOptions): Promise<User | undefined> {
    const user = await this._table.findOne(userId, { ...options });

    if (!user) return;

    return UserMapper.toDomain(user);
  }

  public async search(
    searchOptions: SearchUserOptions,
    pagination: PaginationOptionsProtocol,
  ): Promise<PaginationResponseProtocol<User>> {
    const { order, page, perPage } = pagination;
    const { username, isAdmin } = searchOptions;

    const [users, count] = await this._table.findAndCount({
      where: {
        ...(username ? { username: Like(`%${username}%`) } : null),
        ...(isAdmin !== undefined ? { isAdmin } : null),
      },
      order,
      skip: page,
      take: perPage,
    });

    return {
      data: users.map(UserMapper.toDomain),
      page: Math.ceil(page / perPage + 1),
      perPage,
      order: order || null,
      maxItems: count,
      maxPage: Math.ceil(count / perPage),
    };
  }

  public async existsWithEmail(email: string): Promise<boolean> {
    const emailExists = await this._table.findOne({ where: { email }, withDeleted: true });

    return !!emailExists;
  }

  public async existsWithUsername(username: string): Promise<boolean> {
    const usernameExists = await this._table.findOne({ where: { username }, withDeleted: true });

    return !!usernameExists;
  }
}
