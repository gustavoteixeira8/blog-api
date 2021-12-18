import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { inject, injectable } from 'tsyringe';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';
import { DateProviderProtocol } from '@shared/providers/dateProvider/DateProviderProtocol';
import { TokenProviderProtocol } from '@shared/providers/tokenProvider/TokenProviderProtocol';
import { QueueProviderProtocol } from '@shared/providers/queueProvider/QueueProviderProtocol';
import { MailOptionsProtocol } from '@shared/providers/mailProvider/MailProvider';
import { appConfig } from '@config/app';
import { UserToken } from '../entities/userToken/UserToken';
import { UserTokenRepositoryProtocol } from '../repositories/UserTokenRepositoryProtocol';
import { MissingParamError } from '@shared/core/errors';

export interface SendPasswordMailRequest {
  email: string;
}

@injectable()
export class SendUpdatePasswordEmailUseCase
  implements UseCaseProtocol<SendPasswordMailRequest, Promise<void>>
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

  public async execute({ email }: SendPasswordMailRequest): Promise<void> {
    if (!email) throw new MissingParamError('Email');

    const user = await this._userRepository.findByEmail(email, { withDeleted: false });

    if (!user || !user.isEmailVerified) return;

    const userToken = await this._userTokenRepository.findByUserId(user.id.value);

    if (userToken) {
      const tokenIsExpired = this._dateProvider.isAfter(new Date(), userToken.expiresIn);

      if (!tokenIsExpired) return;

      await this._userTokenRepository.delete(userToken.id.value);
    }

    const tokenExpiresIn = this._dateProvider.add(new Date(), { minutes: 15 });
    const token = this._tokenProvider.sign({}, { expiresIn: '15m' });
    const newUserToken = UserToken.create({
      userId: user.id.value,
      expiresIn: tokenExpiresIn,
      token,
      type: 'updatePassword',
    });

    await Promise.all([
      this._userTokenRepository.save(newUserToken),
      this._mailQueueProvider.add({
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
