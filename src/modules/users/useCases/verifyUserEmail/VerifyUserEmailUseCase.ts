import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';
import { UserRepositoryProtocol } from '../../repositories/UserRepositoryProtocol';
import { UserTokenRepositoryProtocol } from '../../repositories/UserTokenRepositoryProtocol';
import { InvalidTokenError, MissingParamError, UserNotFoundError } from '@shared/core/errors';

export interface TokenRequest {
  token: string;
}

export type VerifyUserEmailResponse = Promise<
  void | MissingParamError | InvalidTokenError | UserNotFoundError
>;

export class VerifyUserEmailUseCase
  implements UseCaseProtocol<TokenRequest, VerifyUserEmailResponse>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _userTokenRepository: UserTokenRepositoryProtocol,
    private readonly _dateAdapter: DateAdapterProtocol,
    private readonly _tokenAdapter: TokenAdapterProtocol,
  ) {}

  public async execute({ token }: TokenRequest): VerifyUserEmailResponse {
    if (!token) return new MissingParamError('Token');

    const tokenExists = await this._userTokenRepository.findByToken(token);

    if (!tokenExists || tokenExists.type !== 'verifyEmail') {
      return new InvalidTokenError();
    }

    const tokenIsExpired = this._dateAdapter.isAfter(new Date(), tokenExists.expiresIn);

    if (tokenIsExpired) {
      await this._userTokenRepository.delete(tokenExists.id.value);

      return new InvalidTokenError();
    }

    try {
      this._tokenAdapter.verify(token);
    } catch (error) {
      await this._userTokenRepository.delete(tokenExists.id.value);
      return new InvalidTokenError();
    }

    const user = await this._userRepository.findById(tokenExists.userId.value, {
      withDeleted: false,
    });

    if (!user || user.isEmailVerified) {
      await this._userTokenRepository.delete(tokenExists.id.value);

      return new UserNotFoundError();
    }

    user.verifyEmail();

    await Promise.all([
      this._userRepository.save(user),
      this._userTokenRepository.delete(tokenExists.id.value),
    ]);
  }
}
