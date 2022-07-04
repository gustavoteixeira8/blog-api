import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { MailOptionsProtocol } from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';
import { UserRepositoryProtocol } from '../../repositories/UserRepositoryProtocol';
import { Password } from '@shared/core/valueObjects/Password';
import { HashAdapterProtocol } from '@shared/adapters/hashAdapter/HashAdapterProtocol';
import { appConfig } from '@config/app';
import { UserTokenRepositoryProtocol } from '../../repositories/UserTokenRepositoryProtocol';
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

export class UpdateUserPasswordUseCase
  implements UseCaseProtocol<UpdatePasswordRequest, Promise<void>>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _userTokenRepository: UserTokenRepositoryProtocol,
    private readonly _dateAdapter: DateAdapterProtocol,
    private readonly _tokenAdapter: TokenAdapterProtocol,
    private readonly _hashAdapter: HashAdapterProtocol,
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
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

    const tokenIsExpired = this._dateAdapter.isAfter(new Date(), userToken.expiresIn);

    if (tokenIsExpired) {
      await this._userTokenRepository.delete(userToken.id.value);

      throw new InvalidTokenError();
    }

    try {
      this._tokenAdapter.verify(userToken.token.value);
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

    const isTheSamePassword = await this._hashAdapter.compare(password, user.password.value);

    if (isTheSamePassword) {
      throw new InvalidPasswordError();
    }

    const isValidPassword = Password.create(password, false);

    if (isValidPassword instanceof Error) {
      throw new InvalidPasswordError();
    }

    const hash = await this._hashAdapter.generate(password);
    user.updatePassword(Password.create(hash, true) as Password);

    await Promise.all([
      this._userRepository.save(user),
      this._userTokenRepository.delete(userToken.id.value),
      this._mailQueueAdapter.add({
        to: {
          name: user.fullName.value,
          address: user.email.value,
        },
        subject: `Your password was updated - ${appConfig.name}`,
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
