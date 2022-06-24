import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { MailOptionsProtocol } from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { appConfig } from '@config/app';
import { UserToken } from '../entities/userToken/UserToken';
import { UserTokenRepositoryProtocol } from '../repositories/UserTokenRepositoryProtocol';
import { MissingParamError } from '@shared/core/errors';

export interface SendPasswordMailRequest {
  email: string;
}

export class SendUpdatePasswordEmailUseCase
  implements UseCaseProtocol<SendPasswordMailRequest, Promise<void>>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _userTokenRepository: UserTokenRepositoryProtocol,
    private readonly _dateAdapter: DateAdapterProtocol,
    private readonly _tokenAdapter: TokenAdapterProtocol,
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({ email }: SendPasswordMailRequest): Promise<void> {
    if (!email) throw new MissingParamError('Email');

    const user = await this._userRepository.findByEmail(email, { withDeleted: false });

    if (!user || !user.isEmailVerified) return;

    const userToken = await this._userTokenRepository.findByUserId(user.id.value);

    if (userToken) {
      const tokenIsExpired = this._dateAdapter.isAfter(new Date(), userToken.expiresIn);

      if (!tokenIsExpired) return;

      await this._userTokenRepository.delete(userToken.id.value);
    }

    const tokenExpiresIn = this._dateAdapter.add(new Date(), { minutes: 15 });
    const token = this._tokenAdapter.sign({}, { expiresIn: '15m' });
    const newUserToken = UserToken.create({
      userId: user.id.value,
      expiresIn: tokenExpiresIn,
      token,
      type: 'updatePassword',
    });

    await Promise.all([
      this._userTokenRepository.save(newUserToken),
      this._mailQueueAdapter.add({
        to: {
          name: user.fullName.value,
          address: user.email.value,
        },
        subject: `Password recovery - ${appConfig.name}`,
        context: {
          user: { username: user.username.value },
          token,
          tokenExpires: tokenExpiresIn,
          appConfig,
        },
        html: {
          filename: 'sendEmailUserUpdatePassword',
          module: 'users',
        },
      }),
    ]);
  }
}
