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
      return new UserNotFoundError('Admin or user to remove admin not found');
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
            name: admin.fullName.value,
            address: admin.email.value,
          },
          subject: `You have removed a user from admin - ${appConfig.name}`,
          context: {
            user: { username: admin.username.value },
            userToRemoveAdmin: {
              id: userToRemoveAdmin.id.value,
              email: userToRemoveAdmin.email.value,
            },
            appConfig,
          },
          html: {
            filename: 'adminRemoveAdmin',
            module: 'users',
          },
        },
        {
          to: {
            name: userToRemoveAdmin.fullName.value,
            address: userToRemoveAdmin.email.value,
          },
          subject: `You are no longer an admin - ${appConfig.name}`,
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
