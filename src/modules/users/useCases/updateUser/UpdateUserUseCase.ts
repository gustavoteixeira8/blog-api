import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { PersonName } from '@shared/core/valueObjects/PersonName';
import { Email } from '@shared/core/valueObjects/Email';
import { Username } from '@shared/core/valueObjects/Username';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { MailOptionsProtocol } from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { appConfig } from '@config/app';
import { UserRepositoryProtocol } from '../../repositories/UserRepositoryProtocol';
import {
  EmailAlreadyExistsError,
  InvalidEmailError,
  InvalidFullNameError,
  InvalidUsernameError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from '@shared/core/errors';

export interface UpdateUserRequest {
  userId: string;
  fullName?: string;
  email?: string;
  username?: string;
}

export type UpdateUserResponse = Promise<
  | void
  | UserNotFoundError
  | UserEmailIsNotVerifiedError
  | MissingParamError
  | InvalidUsernameError
  | InvalidFullNameError
  | InvalidEmailError
  | UsernameAlreadyExistsError
  | EmailAlreadyExistsError
>;

export class UpdateUserUseCase implements UseCaseProtocol<UpdateUserRequest, UpdateUserResponse> {
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({
    userId,
    fullName,
    email,
    username,
  }: UpdateUserRequest): UpdateUserResponse {
    if (!userId) return new MissingParamError('User id');

    if (!fullName && !email && !username) {
      return new MissingParamError('Full name, email or username');
    }

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) return new UserNotFoundError();

    if (!user.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }

    const userToCompare = JSON.stringify(user);

    if (fullName) {
      const fullNameOrError = PersonName.create(fullName);

      if (fullNameOrError instanceof Error) {
        return new InvalidFullNameError();
      }

      if (!user.fullName.equals(fullNameOrError)) {
        user.updateFullName(fullNameOrError);
      }
    }

    if (username) {
      const userWithUsernameExists = await this._userRepository.existsWithUsername(username);

      if (userWithUsernameExists && user.username.value !== username) {
        return new UsernameAlreadyExistsError();
      }

      const usernameOrError = Username.create(username);

      if (usernameOrError instanceof Error) {
        return new InvalidUsernameError();
      }

      if (!user.username.equals(usernameOrError)) {
        user.updateUsername(usernameOrError);
      }
    }

    if (email) {
      const userWithEmailExists = await this._userRepository.existsWithEmail(email);

      if (userWithEmailExists && user.email.value !== email) {
        return new EmailAlreadyExistsError();
      }

      const emailOrError = Email.create(email);

      if (emailOrError instanceof Error) {
        return new InvalidEmailError();
      }

      if (!user.email.equals(emailOrError)) {
        user.updateEmail(emailOrError);
        user.uncheckVerifyEmail();
      }
    }

    const userUpdatedToCompare = JSON.stringify(user);

    if (userUpdatedToCompare !== userToCompare) {
      await Promise.all([
        this._userRepository.save(user),
        this._mailQueueAdapter.add({
          to: {
            name: user.fullName.value,
            address: user.email.value,
          },
          subject: `Your user was updated - ${appConfig.name}`,
          context: {
            user: {
              fullName: user.fullName.value,
              username: user.username.value,
              email: user.email.value,
            },
            appConfig,
          },
          html: {
            filename: 'userUpdate',
            module: 'users',
          },
        }),
      ]);
    }
  }
}
