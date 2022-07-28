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

export interface AddRoleAdminToUserRequest {
  userId: string;
  adminId: string;
}

export type AddRoleAdminToUserResponse =
  | MissingParamError
  | UserNotFoundError
  | UserIsNotAdminError
  | UserEmailIsNotVerifiedError
  | void;

export class AddRoleAdminToUserUseCase
  implements UseCaseProtocol<AddRoleAdminToUserRequest, Promise<AddRoleAdminToUserResponse>>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({
    adminId,
    userId,
  }: AddRoleAdminToUserRequest): Promise<AddRoleAdminToUserResponse> {
    if (!adminId || !userId) return new MissingParamError('Admin id and user id');

    const [admin, userToAddAdminRole] = await Promise.all([
      this._userRepository.findById(adminId, { withDeleted: false }),
      this._userRepository.findById(userId, { withDeleted: false }),
    ]);

    if (!admin || !userToAddAdminRole) {
      return new UserNotFoundError('User to add admin not found');
    }

    if (!admin.isAdmin) {
      return new UserIsNotAdminError();
    }

    if (!admin.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }

    if (userToAddAdminRole.isAdmin) {
      return;
    }

    if (!userToAddAdminRole.isEmailVerified) {
      return new UserEmailIsNotVerifiedError('User to add admin role must have verified email');
    }

    userToAddAdminRole.makeAdmin();

    await Promise.all([
      this._userRepository.save(userToAddAdminRole),
      this._mailQueueAdapter.add([
        {
          to: {
            name: userToAddAdminRole.fullName.value,
            address: userToAddAdminRole.email.value,
          },
          subject: `${admin.username.value} add you to admins - ${appConfig.name}`,
          context: {
            user: { username: userToAddAdminRole.username.value },
            adminUsername: admin.username.value,
            appConfig,
          },
          html: {
            filename: 'addRoleAdminToUser',
            module: 'users',
          },
        },
      ]),
    ]);
  }
}
