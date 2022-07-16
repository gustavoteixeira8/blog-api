import { appConfig } from '@config/app';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import {
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserNotFoundError,
} from '@shared/core/errors';
import { MailOptionsProtocol } from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { UserRepositoryProtocol } from '../../repositories/UserRepositoryProtocol';

export interface SoftDeleteRequest {
  userId: string;
}

export type SoftDeleteResponse = Promise<
  void | MissingParamError | UserNotFoundError | UserEmailIsNotVerifiedError
>;

export class SoftDeleteUserUseCase
  implements UseCaseProtocol<SoftDeleteRequest, SoftDeleteResponse>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({ userId }: SoftDeleteRequest): SoftDeleteResponse {
    if (!userId) return new MissingParamError('User id');

    const userExists = await this._userRepository.findById(userId, { withDeleted: false });

    if (!userExists) {
      return new UserNotFoundError();
    }

    if (!userExists.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }

    userExists.delete();

    await Promise.all([
      this._userRepository.softDelete(userExists.id.value),
      this._mailQueueAdapter.add({
        to: {
          name: userExists.fullName.value,
          address: userExists.email.value,
        },
        subject: `Your user will be deleted in 1 month - ${appConfig.name}`,
        context: {
          user: {
            username: userExists.username.value,
            email: userExists.email.value,
            fullName: userExists.fullName.value,
          },
          appConfig,
        },
        html: {
          filename: 'userSoftDelete',
          module: 'users',
        },
      }),
    ]);
  }
}
