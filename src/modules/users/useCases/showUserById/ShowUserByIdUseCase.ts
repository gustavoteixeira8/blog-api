import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { MissingParamError, UserNotFoundError } from '@shared/core/errors';
import { User } from '../../entities/user/User';
import { UserRepositoryProtocol } from '../../repositories/UserRepositoryProtocol';

export interface ShowUserByIdRequest {
  userId: string;
}

export type ShowUserByIdResponse = Promise<User | MissingParamError | UserNotFoundError>;

export class ShowUserByIdUseCase
  implements UseCaseProtocol<ShowUserByIdRequest, ShowUserByIdResponse>
{
  constructor(private readonly _userRepository: UserRepositoryProtocol) {}

  public async execute({ userId }: ShowUserByIdRequest): ShowUserByIdResponse {
    if (!userId) return new MissingParamError('User id');

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) return new UserNotFoundError();

    return user;
  }
}
