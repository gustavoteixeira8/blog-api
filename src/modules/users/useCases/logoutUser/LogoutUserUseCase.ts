import { RedisAuthStorageProtocol } from '@modules/users/cache/auth/RedisAuthStorageProtocol';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';
import { InvalidTokenError, MissingParamError } from '@shared/core/errors';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';

export interface LogoutRequest {
  accessToken: string;
}

export type LogoutResponse = Promise<void | MissingParamError | InvalidTokenError>;

export class LogoutUserUseCase implements UseCaseProtocol<LogoutRequest, LogoutResponse> {
  constructor(
    private readonly _redisAuthStorage: RedisAuthStorageProtocol,
    private readonly _tokenAdapter: TokenAdapterProtocol,
  ) {}

  public async execute({ accessToken }: LogoutRequest): LogoutResponse {
    if (!accessToken) return new MissingParamError('Access token');

    try {
      const { id } = this._tokenAdapter.verify(accessToken);
      const userSession = await this._redisAuthStorage.getToken(id);

      if (!userSession) {
        return;
      }

      if (userSession.accessToken !== accessToken || userSession.userId !== id) {
        return new InvalidTokenError();
      }

      await this._redisAuthStorage.deleteToken(id);
    } catch (error) {
      return new InvalidTokenError();
    }
  }
}
