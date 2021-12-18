import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { QueueProviderProtocol } from '@shared/providers/queueProvider/QueueProviderProtocol';
import { MailOptionsProtocol } from '@shared/providers/mailProvider/MailProvider';
import { TokenProviderProtocol } from '@shared/providers/tokenProvider/TokenProviderProtocol';
import { DateProviderProtocol } from '@shared/providers/dateProvider/DateProviderProtocol';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';
import { Password } from '@shared/core/entities/valueObjects/Password';
import { HashProviderProtocol } from '@shared/providers/hashProvider/HashProviderProtocol';
import { appConfig } from '@config/app';
import { UserTokenRepositoryProtocol } from '../repositories/UserTokenRepositoryProtocol';
import {
  InvalidPasswordError,
  InvalidTokenError,
  MissingParamError,
  PasswordMustBeEqualConfirmPasswordError,
  UserEmailIsNotVerifiedError,
  UserNotFoundError,
} from '@shared/core/errors';

export interface UpdatePasswordRequest {
  password: string;
  confirmPassword: string;
  token: string;
}

@injectable()
export class UpdateUserPasswordUseCase
  implements UseCaseProtocol<UpdatePasswordRequest, Promise<void>>
{
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('UserTokenRepository')
    private readonly _userTokenRepository: UserTokenRepositoryProtocol,
    @inject('DateProvider')
    private readonly _dateProvider: DateProviderProtocol,
    @inject('TokenProvider')
    private readonly _tokenProvider: TokenProviderProtocol,
    @inject('HashProvider')
    private readonly _hashProvider: HashProviderProtocol,
    @inject('MailQueueProvider')
    private readonly _mailQueueProvider: QueueProviderProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({ password, confirmPassword, token }: UpdatePasswordRequest): Promise<void> {
    if (!token) throw new MissingParamError('Token');

    if (!password || !confirmPassword) {
      throw new MissingParamError('Password and confirm password');
    }

    if (password !== confirmPassword) {
      throw new PasswordMustBeEqualConfirmPasswordError();
    }

    const userToken = await this._userTokenRepository.findByToken(token);

    if (!userToken || userToken.type !== 'updatePassword') {
      throw new InvalidTokenError();
    }

    const tokenIsExpired = this._dateProvider.isAfter(new Date(), userToken.expiresIn);

    if (tokenIsExpired) {
      await this._userTokenRepository.delete(userToken.id.value);

      throw new InvalidTokenError();
    }

    try {
      this._tokenProvider.verify(userToken.token.value);
    } catch (error) {
      await this._userTokenRepository.delete(userToken.id.value);
      throw new InvalidTokenError();
    }

    const user = await this._userRepository.findById(userToken.userId.value, {
      withDeleted: false,
    });

    if (!user) {
      throw new UserNotFoundError();
    }
    if (!user.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }

    const isTheSamePassword = await this._hashProvider.compare(password, user.password.value);

    if (isTheSamePassword) {
      throw new InvalidPasswordError();
    }

    const isValidPassword = Password.create(password, false);

    if (isValidPassword instanceof Error) {
      throw new InvalidPasswordError();
    }

    const hash = await this._hashProvider.generate(password);
    user.updatePassword(Password.create(hash, true) as Password);

    await Promise.all([
      this._userRepository.save(user),
      this._userTokenRepository.delete(userToken.id.value),
      this._mailQueueProvider.add({
        to: {
          name: user.fullName.value,
          address: user.email.value,
        },
        subject: `Your password has been updated - ${appConfig.name}`,
        context: {
          user: {
            fullName: user.fullName.value,
            username: user.username.value,
            email: user.email.value,
          },
          appConfig,
        },
        html: {
          filename: 'userUpdatePassword',
          module: 'users',
        },
      }),
    ]);
  }
}
