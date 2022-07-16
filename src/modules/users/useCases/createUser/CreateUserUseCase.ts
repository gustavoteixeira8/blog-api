import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { HashAdapterProtocol } from '@shared/adapters/hashAdapter/HashAdapterProtocol';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { MailOptionsProtocol } from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { appConfig } from '@config/app';
import { UserRepositoryProtocol } from '../../repositories/UserRepositoryProtocol';
import { Password } from '@shared/core/valueObjects/Password';
import { User } from '../../entities/user/User';
import {
  EmailAlreadyExistsError,
  InvalidEmailError,
  InvalidFullNameError,
  InvalidPasswordError,
  InvalidUsernameError,
  MissingParamError,
  UsernameAlreadyExistsError,
} from '@shared/core/errors';

export interface CreateUserRequest {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

export type CreateUserResponse =
  | MissingParamError
  | EmailAlreadyExistsError
  | UsernameAlreadyExistsError
  | InvalidEmailError
  | InvalidUsernameError
  | InvalidFullNameError
  | InvalidPasswordError
  | void;

export class CreateUserUseCase
  implements UseCaseProtocol<CreateUserRequest, Promise<CreateUserResponse>>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _hashAdapter: HashAdapterProtocol,
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({
    fullName,
    email,
    password,
    username,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    if (!fullName || !email || !password || !username) {
      return new MissingParamError('Full name, email, username and password');
    }

    const [emailExists, usernameExists] = await Promise.all([
      this._userRepository.existsWithEmail(email),
      this._userRepository.existsWithUsername(username),
    ]);

    if (emailExists) {
      return new EmailAlreadyExistsError();
    }
    if (usernameExists) {
      return new UsernameAlreadyExistsError();
    }

    const user = User.create({
      fullName,
      email,
      username,
      password,
      isEmailVerified: false,
      isAdmin: false,
    });

    if (user instanceof Error) {
      return user;
    }

    const hash = await this._hashAdapter.generate(user.password.value);
    const passwordHash = Password.create(hash, true) as Password;
    user.updatePassword(passwordHash);

    await Promise.all([
      this._userRepository.save(user),
      this._mailQueueAdapter.add({
        to: {
          name: user.fullName.value,
          address: user.email.value,
        },
        subject: `Welcome to ${appConfig.name}`,
        context: {
          user: { username: user.username.value },
          appConfig,
        },
        html: {
          filename: 'welcome',
          module: 'users',
        },
      }),
    ]);
  }
}
