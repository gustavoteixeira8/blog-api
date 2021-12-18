import { RepositoryOptions } from '@shared/core/repositories/RepositoryOptions';
import { UserToken } from '../entities/userToken/UserToken';
import { UserTokenProtocol } from '../entities/userToken/UserTokenProtocol';

export interface UserTokenRepositoryProtocol {
  save(userToken: UserTokenProtocol): Promise<void>;
  delete(tokenId: string): Promise<void>;
  findById(tokenId: string, options?: RepositoryOptions): Promise<UserToken | undefined>;
  findByUserId(userId: string, options?: RepositoryOptions): Promise<UserToken | undefined>;
  findByToken(token: string, options?: RepositoryOptions): Promise<UserToken | undefined>;
}
