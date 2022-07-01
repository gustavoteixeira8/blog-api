import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { MailOptionsProtocol } from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';
import { appConfig } from '@config/app';
import { UserRepositoryProtocol } from '../../repositories/UserRepositoryProtocol';
import { UserToken } from '../../entities/userToken/UserToken';
import { UserTokenRepositoryProtocol } from '../../repositories/UserTokenRepositoryProtocol';
import { MissingParamError } from '@shared/core/errors';

export interface SendVerificationMailRequest {
  email: string;
}

export class SendVerificationEmailUseCase
  implements UseCaseProtocol<SendVerificationMailRequest, Promise<void>>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _userTokenRepository: UserTokenRepositoryProtocol,
    private readonly _dateAdapter: DateAdapterProtocol,
    private readonly _tokenAdapter: TokenAdapterProtocol,
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({ email }: SendVerificationMailRequest): Promise<void> {
    if (!email) throw new MissingParamError('Email');

    const user = await this._userRepository.findByEmail(email, { withDeleted: false });

    if (!user || user.isEmailVerified) return;

    const userToken = await this._userTokenRepository.findByUserId(user.id.value);

    if (userToken) {
      const userTokenIsExpired = this._dateAdapter.isAfter(new Date(), userToken.expiresIn);

      if (!userTokenIsExpired && userToken.type === 'verifyEmail') return;

      await this._userTokenRepository.delete(userToken.id.value);
    }

    const expiresDate = this._dateAdapter.add(new Date(), { minutes: 30 });
    const token = this._tokenAdapter.sign({}, { expiresIn: '30m' });

    const newUserToken = UserToken.create({
      userId: user.id.value,
      expiresIn: expiresDate,
      token,
      type: 'verifyEmail',
    });

    await Promise.all([
      this._userTokenRepository.save(newUserToken),
      this._mailQueueAdapter.add({
        to: {
          name: user.fullName.value,
          address: user.email.value,
        },
        subject: `Email verification - ${appConfig.name}`,
        context: {
          user: { username: user.username.value },
          appConfig,
          token,
          tokenExpires: expiresDate,
        },
        html: {
          filename: 'sendEmailVerification',
          module: 'users',
        },
      }),
    ]);
  }
}
