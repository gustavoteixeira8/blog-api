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
import { inject, injectable } from 'tsyringe';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';

export interface RemoveUserAdminRequest {
  userId: string;
  adminId: string;
}

@injectable()
export class RemoveUserAdminUseCase
  implements UseCaseProtocol<RemoveUserAdminRequest, Promise<void>>
{
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('MailQueueAdapter')
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({ adminId, userId }: RemoveUserAdminRequest): Promise<void> {
    if (!adminId || !userId) throw new MissingParamError('Admin id and user id');

    const [admin, userToRemoveAdmin] = await Promise.all([
      this._userRepository.findById(adminId, { withDeleted: false }),
      this._userRepository.findById(userId, { withDeleted: false }),
    ]);

    if (!admin || !userToRemoveAdmin) {
      throw new UserNotFoundError('Admin or user to remove admin not found');
    }

    if (!admin.isAdmin) {
      throw new UserIsNotAdminError();
    }

    if (!admin.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
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
