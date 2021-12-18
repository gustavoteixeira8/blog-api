import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { DateProviderProtocol } from '@shared/providers/dateProvider/DateProviderProtocol';
import { TokenProviderProtocol } from '@shared/providers/tokenProvider/TokenProviderProtocol';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';
import { UserTokenRepositoryProtocol } from '../repositories/UserTokenRepositoryProtocol';
import { InvalidTokenError, MissingParamError, UserNotFoundError } from '@shared/core/errors';

export interface TokenRequest {
  token: string;
}

@injectable()
export class VerifyUserEmailUseCase implements UseCaseProtocol<TokenRequest, Promise<void>> {
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('UserTokenRepository')
    private readonly _userTokenRepository: UserTokenRepositoryProtocol,
    @inject('DateProvider')
    private readonly _dateProvider: DateProviderProtocol,
    @inject('TokenProvider')
    private readonly _tokenProvider: TokenProviderProtocol,
  ) {}

  public async execute({ token }: TokenRequest): Promise<void> {
    if (!token) throw new MissingParamError('Token');

    const tokenExists = await this._userTokenRepository.findByToken(token);

    if (!tokenExists || tokenExists.type !== 'verifyEmail') {
      throw new InvalidTokenError();
    }

    const tokenIsExpired = this._dateProvider.isAfter(new Date(), tokenExists.expiresIn);

    if (tokenIsExpired) {
      await this._userTokenRepository.delete(tokenExists.id.value);

      throw new InvalidTokenError();
    }

    try {
      this._tokenProvider.verify(token);
    } catch (error) {
      await this._userTokenRepository.delete(tokenExists.id.value);
      throw new InvalidTokenError();
    }

    const user = await this._userRepository.findById(tokenExists.userId.value, {
      withDeleted: false,
    });

    if (!user || user.isEmailVerified) {
      await this._userTokenRepository.delete(tokenExists.id.value);

      throw new UserNotFoundError();
    }

    user.verifyEmail();

    await Promise.all([
      this._userRepository.save(user),
      this._userTokenRepository.delete(tokenExists.id.value),
    ]);
  }
}
