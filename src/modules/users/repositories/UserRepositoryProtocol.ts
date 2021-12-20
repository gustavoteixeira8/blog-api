import {
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { RepositoryOptions } from '@shared/core/repositories/RepositoryOptions';
import { User } from '../entities/user/User';
import { UserProtocol } from '../entities/user/UserProtocol';

export interface SearchUsersProtocol {
  username?: string;
  isAdmin?: boolean;
}

export type SearchUsersPaginate<T> = Partial<PaginationOptionsProtocol> & T;

export type UsersPaginateResponse = PaginationResponseProtocol<User>;

export interface UserRepositoryProtocol {
  save(user: UserProtocol): Promise<void>;
  recover(userId: string): Promise<void>;
  softDelete(userId: string): Promise<void>;
  delete(userId: string): Promise<void>;
  findByEmail(email: string, options?: RepositoryOptions): Promise<User | undefined>;
  findByUsername(username: string, options?: RepositoryOptions): Promise<User | undefined>;
  findById(userId: string, options?: RepositoryOptions): Promise<User | undefined>;
  search(
    searchOptions: SearchUsersProtocol,
    pagination: PaginationOptionsProtocol,
  ): Promise<UsersPaginateResponse>;
  existsWithEmail(email: string): Promise<boolean>;
  existsWithUsername(username: string): Promise<boolean>;
  findAllDeleted(): Promise<User[]>;
}
