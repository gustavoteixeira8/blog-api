import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { MissingParamError, UserNotFoundError } from '@shared/core/errors';
import { User } from '../../entities/user/User';
import { UserRepositoryProtocol } from '../../repositories/UserRepositoryProtocol';

export interface ShowUserByUsernameRequest {
  username: string;
}

export type ShowUserByUsernameResponse = Promise<User | MissingParamError | UserNotFoundError>;

export class ShowUserByUsernameUseCase
  implements UseCaseProtocol<ShowUserByUsernameRequest, ShowUserByUsernameResponse>
{
  constructor(private readonly _userRepository: UserRepositoryProtocol) {}

  public async execute({ username }: ShowUserByUsernameRequest): ShowUserByUsernameResponse {
    if (!username) throw new MissingParamError('Username');

    const user = await this._userRepository.findByUsername(username, { withDeleted: false });

    if (!user) throw new UserNotFoundError();

    return user;
  }
}
