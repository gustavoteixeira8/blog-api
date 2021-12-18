import {
  OrderByProtocol,
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { MissingParamError, UserIsNotAdminError } from '@shared/core/errors';
import { inject, injectable } from 'tsyringe';
import { User } from '../entities/user/User';
import { SearchUserOptions, UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';

export type SearchUsersRequest = Partial<PaginationOptionsProtocol> & {
  adminId: string;
} & SearchUserOptions;

export type SearchUsersResponse = Promise<PaginationResponseProtocol<User>>;

@injectable()
export class SearchUsersUseCase
  implements UseCaseProtocol<SearchUsersRequest, SearchUsersResponse>
{
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({
    order,
    page,
    perPage,
    adminId,
    username,
    isAdmin,
  }: SearchUsersRequest): SearchUsersResponse {
    if (!adminId) throw new MissingParamError('Admin id');

    const adminExists = await this._userRepository.findById(adminId, { withDeleted: false });

    if (!adminExists || !adminExists.isEmailVerified || !adminExists.isAdmin) {
      throw new UserIsNotAdminError();
    }

    const take = !perPage || perPage > 20 ? 20 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : { createdAt: 'DESC' };
    const pagination = {
      order: orderByDefault as OrderByProtocol,
      page: skip,
      perPage: take,
    };

    const users = await this._userRepository.search({ username, isAdmin }, pagination);

    return users;
  }
}
