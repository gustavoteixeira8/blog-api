import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { QueueProviderProtocol } from '@shared/providers/queueProvider/QueueProviderProtocol';
import { MailOptionsProtocol } from '@shared/providers/mailProvider/MailProvider';
import { TokenProviderProtocol } from '@shared/providers/tokenProvider/TokenProviderProtocol';
import { DateProviderProtocol } from '@shared/providers/dateProvider/DateProviderProtocol';
import { appConfig } from '@config/app';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';
import { UserToken } from '../entities/userToken/UserToken';
import { UserTokenRepositoryProtocol } from '../repositories/UserTokenRepositoryProtocol';
import { MissingParamError } from '@shared/core/errors';

export interface SendVerificationMailRequest {
  email: string;
}

@injectable()
export class SendVerificationEmailUseCase
  implements UseCaseProtocol<SendVerificationMailRequest, Promise<void>>
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
    @inject('MailQueueProvider')
    private readonly _mailQueueProvider: QueueProviderProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({ email }: SendVerificationMailRequest): Promise<void> {
    if (!email) throw new MissingParamError('Email');

    const user = await this._userRepository.findByEmail(email, { withDeleted: false });

    if (!user || user.isEmailVerified) return;

    const userToken = await this._userTokenRepository.findByUserId(user.id.value);

    if (userToken) {
      const userTokenIsExpired = this._dateProvider.isAfter(new Date(), userToken.expiresIn);

      if (!userTokenIsExpired && userToken.type === 'verifyEmail') return;

      await this._userTokenRepository.delete(userToken.id.value);
    }

    const expiresDate = this._dateProvider.add(new Date(), { minutes: 30 });
    const token = this._tokenProvider.sign({}, { expiresIn: '30m' });

    const newUserToken = UserToken.create({
      userId: user.id.value,
      expiresIn: expiresDate,
      token,
      type: 'verifyEmail',
    });

    await Promise.all([
      this._userTokenRepository.save(newUserToken),
      this._mailQueueProvider.add({
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
