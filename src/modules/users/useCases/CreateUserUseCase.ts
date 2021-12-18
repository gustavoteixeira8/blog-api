import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { HashProviderProtocol } from '@shared/providers/hashProvider/HashProviderProtocol';
import { QueueProviderProtocol } from '@shared/providers/queueProvider/QueueProviderProtocol';
import { MailOptionsProtocol } from '@shared/providers/mailProvider/MailProvider';
import { appConfig } from '@config/app';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';
import { Password } from '@shared/core/entities/valueObjects/Password';
import { User } from '../entities/user/User';
import {
  EmailAlreadyExistsError,
  MissingParamError,
  UsernameAlreadyExistsError,
} from '@shared/core/errors';

export interface CreateUserRequest {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

@injectable()
export class CreateUserUseCase implements UseCaseProtocol<CreateUserRequest, Promise<void>> {
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('HashProvider')
    private readonly _hashProvider: HashProviderProtocol,
    @inject('MailQueueProvider')
    private readonly _mailQueueProvider: QueueProviderProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({ fullName, email, password, username }: CreateUserRequest): Promise<void> {
    if (!fullName || !email || !password || !username) {
      throw new MissingParamError('Full name, email, username and password');
    }

    const [emailExists, usernameExists] = await Promise.all([
      this._userRepository.existsWithEmail(email),
      this._userRepository.existsWithUsername(username),
    ]);

    if (emailExists) {
      throw new EmailAlreadyExistsError(email);
    }
    if (usernameExists) {
      throw new UsernameAlreadyExistsError(username);
    }

    const user = User.create({
      fullName,
      email,
      username,
      password,
      isEmailVerified: false,
      isAdmin: false,
    });

    const hash = await this._hashProvider.generate(user.password.value);
    const passwordHash = Password.create(hash, true) as Password;
    user.updatePassword(passwordHash);

    await Promise.all([
      this._userRepository.save(user),
      this._mailQueueProvider.add({
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
