import { appConfig } from '@config/app';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import {
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';
import { MailOptionsProtocol } from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { UserRepositoryProtocol } from '../../repositories/UserRepositoryProtocol';

export interface RemoveUserAdminRequest {
  userId: string;
  adminId: string;
}

export type RemoveUserAdminResponse =
  | void
  | MissingParamError
  | UserNotFoundError
  | UserIsNotAdminError
  | UserEmailIsNotVerifiedError;

export class RemoveUserAdminUseCase
  implements UseCaseProtocol<RemoveUserAdminRequest, Promise<RemoveUserAdminResponse>>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({
    adminId,
    userId,
  }: RemoveUserAdminRequest): Promise<RemoveUserAdminResponse> {
    if (!adminId || !userId) return new MissingParamError('Admin id and user id');

    const [admin, userToRemoveAdmin] = await Promise.all([
      this._userRepository.findById(adminId, { withDeleted: false }),
      this._userRepository.findById(userId, { withDeleted: false }),
    ]);

    if (!admin || !userToRemoveAdmin) {
      return new UserNotFoundError('User to add admin not found');
    }

    if (!admin.isAdmin) {
      return new UserIsNotAdminError();
    }

    if (!admin.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }

    if (!userToRemoveAdmin.isAdmin) {
      return;
    }

    userToRemoveAdmin.removeAdmin();

    await Promise.all([
      this._userRepository.save(userToRemoveAdmin),
      this._mailQueueAdapter.add([
        {
          to: {
            name: userToRemoveAdmin.fullName.value,
            address: userToRemoveAdmin.email.value,
          },
          subject: `${admin.username.value} removed you from admins - ${appConfig.name}`,
          context: {
            user: { username: userToRemoveAdmin.username.value },
            adminUsername: admin.username.value,
            appConfig,
          },
          html: {
            filename: 'userRemoveAdmin',
            module: 'users',
          },
        },
      ]),
    ]);
  }
}
