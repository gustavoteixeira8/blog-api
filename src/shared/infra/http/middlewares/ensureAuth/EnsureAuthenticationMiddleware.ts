import { MiddlewareResponse, WebMiddleware } from '@shared/core/middlewares/WebMiddleware';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { UnauthorizedError } from '@shared/core/http/httpErrors';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';

export class EnsureAuthenticationMiddleware extends WebMiddleware {
  constructor(private _tokenAdapter: TokenAdapterProtocol) {
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

      return { userData: { userId: id } };
    } catch (err) {
      return new UnauthorizedError('Invalid token');
    }
  }
}
