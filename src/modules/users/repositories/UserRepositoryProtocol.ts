import {
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { RepositoryOptions } from '@shared/core/repositories/RepositoryOptions';
import { User } from '../entities/user/User';
import { UserProtocol } from '../entities/user/UserProtocol';

export interface SearchUserOptions {
  username?: string;
  isAdmin?: boolean;
}

export interface UserRepositoryProtocol {
  save(user: UserProtocol): Promise<void>;
  recover(userId: string): Promise<void>;
  softDelete(userId: string): Promise<void>;
  delete(userId: string): Promise<void>;
  findByEmail(email: string, options?: RepositoryOptions): Promise<User | undefined>;
  findByUsername(username: string, options?: RepositoryOptions): Promise<User | undefined>;
  findById(userId: string, options?: RepositoryOptions): Promise<User | undefined>;
  search(
    searchOptions: SearchUserOptions,
    pagination: PaginationOptionsProtocol,
  ): Promise<PaginationResponseProtocol<User>>;
  existsWithEmail(email: string): Promise<boolean>;
  existsWithUsername(username: string): Promise<boolean>;
  findAllDeleted(): Promise<User[]>;
}
