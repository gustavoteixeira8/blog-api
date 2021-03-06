import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { MissingParamError, UserNotFoundError } from '@shared/core/errors';
import { inject, injectable } from 'tsyringe';
import { User } from '../entities/user/User';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';

export interface ShowUserByIdRequest {
  userId: string;
}

@injectable()
export class ShowUserByIdUseCase implements UseCaseProtocol<ShowUserByIdRequest, Promise<User>> {
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({ userId }: ShowUserByIdRequest): Promise<User> {
    if (!userId) throw new MissingParamError('User id');

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) throw new UserNotFoundError();

    return user;
  }
}
