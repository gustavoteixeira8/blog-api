import { UserToken } from '@modules/users/entities/userToken/UserToken';
import { UserTokenProtocol } from '@modules/users/entities/userToken/UserTokenProtocol';
import { UserTokenMapper } from '@modules/users/mappers/UserTokenMapper';
import { RepositoryOptions } from '@shared/core/repositories/RepositoryOptions';
import { UserTokenEntity } from '@shared/infra/database/entities/UserTokenEntity';
import { getRepository } from 'typeorm';
import { UserTokenRepositoryProtocol } from '../UserTokenRepositoryProtocol';

export class UserTokenRepositoryOrm implements UserTokenRepositoryProtocol {
  private readonly _table = getRepository(UserTokenEntity);

  public async save(userToken: UserTokenProtocol): Promise<void> {
    const userTokenMapped = UserTokenMapper.toPersistence(userToken);

    await this._table.save(userTokenMapped);
  }

  public async delete(tokenId: string): Promise<void> {
    await this._table.delete(tokenId);
  }

  public async findById(
    tokenId: string,
    options?: RepositoryOptions,
  ): Promise<UserToken | undefined> {
    const userToken = await this._table.findOne({ where: { id: tokenId }, ...options });

    if (!userToken) return;

    return UserTokenMapper.toDomain(userToken);
  }

  public async findByUserId(
    userId: string,
    options?: RepositoryOptions,
  ): Promise<UserToken | undefined> {
    const userToken = await this._table.findOne({ where: { userId }, ...options });

    if (!userToken) return;

    return UserTokenMapper.toDomain(userToken);
  }

  public async findByToken(
    token: string,
    options?: RepositoryOptions,
  ): Promise<UserToken | undefined> {
    const userToken = await this._table.findOne({ where: { token }, ...options });

    if (!userToken) return;

    return UserTokenMapper.toDomain(userToken);
  }
}
