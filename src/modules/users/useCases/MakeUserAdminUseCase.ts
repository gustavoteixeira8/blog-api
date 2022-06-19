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

export interface MakeUserAdminRequest {
  userId: string;
  adminId: string;
}

@injectable()
export class MakeUserAdminUseCase implements UseCaseProtocol<MakeUserAdminRequest, Promise<void>> {
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('MailQueueAdapter')
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({ adminId, userId }: MakeUserAdminRequest): Promise<void> {
    if (!adminId || !userId) throw new MissingParamError('Admin id and user id');

    const [admin, userToMakeAdmin] = await Promise.all([
      this._userRepository.findById(adminId, { withDeleted: false }),
      this._userRepository.findById(userId, { withDeleted: false }),
    ]);

    if (!admin || !userToMakeAdmin) {
      throw new UserNotFoundError('Admin or user to make admin not found');
    }

    if (!admin.isAdmin) {
      throw new UserIsNotAdminError();
    }

    if (!admin.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }

    if (userToMakeAdmin.isAdmin) {
      return;
    }

    if (!userToMakeAdmin.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }

    userToMakeAdmin.makeAdmin();

    await Promise.all([
      this._userRepository.save(userToMakeAdmin),
      this._mailQueueAdapter.add([
        {
          to: {
            name: admin.fullName.value,
            address: admin.email.value,
          },
          subject: `You have given admin permission to a new user - ${appConfig.name}`,
          context: {
            user: { username: admin.username.value },
            userToMakeAdmin: { id: userToMakeAdmin.id.value, email: userToMakeAdmin.email.value },
            appConfig,
          },
          html: {
            filename: 'adminAddAdmin',
            module: 'users',
          },
        },
        {
          to: {
            name: userToMakeAdmin.fullName.value,
            address: userToMakeAdmin.email.value,
          },
          subject: `Now you are an admin - ${appConfig.name}`,
          context: {
            user: { username: userToMakeAdmin.username.value },
            adminUsername: admin.username.value,
            appConfig,
          },
          html: {
            filename: 'userAddAdmin',
            module: 'users',
          },
        },
      ]),
    ]);
  }
}
