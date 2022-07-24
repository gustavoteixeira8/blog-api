import { MiddlewareResponse, WebMiddleware } from '@shared/core/middlewares/WebMiddleware';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { UnauthorizedError } from '@shared/core/http/httpErrors';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';
import { RedisAuthStorageProtocol } from '@modules/users/cache/auth/RedisAuthStorageProtocol';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';

export class EnsureAuthenticationMiddleware extends WebMiddleware {
  constructor(
    private _tokenAdapter: TokenAdapterProtocol,
    private _redisAuthStorage: RedisAuthStorageProtocol,
    private _dateAdapter: DateAdapterProtocol,
  ) {
    super();
  }

  protected async handleMiddleware(httpRequest: HttpRequest): Promise<MiddlewareResponse> {
    const authorization = httpRequest.headers.authorization;

    if (!authorization) {
      return new UnauthorizedError('Missing authorization');
    }

    const [, tokenJWT] = authorization.split(' ');

    if (!tokenJWT) {
      return new UnauthorizedError('Token must be provided');
    }

    try {
      const { id } = this._tokenAdapter.verify(tokenJWT);
      const authData = await this._redisAuthStorage.getToken(id);
      const checkToken = !authData || authData.accessToken !== tokenJWT || authData.userId != id;

      if (checkToken) {
        await this._redisAuthStorage.deleteToken(id);

        return new UnauthorizedError('Invalid token');
      }

      const tokenIsExpired = this._dateAdapter.isAfter(new Date(), new Date(authData.expiresIn));

      if (tokenIsExpired) {
        await this._redisAuthStorage.deleteToken(id);

        return new UnauthorizedError('Invalid token');
      }

      return { userData: { userId: id } };
    } catch (err) {
      return new UnauthorizedError('Invalid token');
    }
  }
}
